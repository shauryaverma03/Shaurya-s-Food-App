"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/order-context"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, AlertCircle, CreditCard, Smartphone, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { isFirebaseEnabled } from "@/lib/firebase"

export default function OrderSummaryPage() {
  const { state, dispatch } = useCart()
  const { addOrder } = useOrders()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.displayName || "",
    phone: "",
    address: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  const handleConfirmOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !paymentMethod) {
      alert("Please fill in all required fields including payment method")
      return
    }

    if (!validatePhoneNumber(customerInfo.phone)) {
      alert("Please enter a valid 10-digit Indian mobile number")
      return
    }

    if (!user) {
      router.push("/login")
      return
    }

    setLoading(true)

    try {
      // Create order object
      const orderData = {
        items: state.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        total: state.total,
        status: "pending" as const,
        estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
        customerInfo: {
          ...customerInfo,
          userId: user.uid,
          userEmail: user.email || "",
        },
        paymentMethod,
      }

      // Add order to context (which saves to localStorage)
      const newOrder = addOrder(orderData)

      // Save customer info for future orders
      if (typeof window !== "undefined") {
        localStorage.setItem(`customerInfo_${user.uid}`, JSON.stringify(customerInfo))
      }

      // Save order data for admin
      if (typeof window !== "undefined") {
        const adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]")
        adminOrders.push({
          ...newOrder,
          customerInfo: orderData.customerInfo,
          paymentMethod,
          orderDate: new Date().toISOString(),
        })
        localStorage.setItem("adminOrders", JSON.stringify(adminOrders))
      }

      // If Firebase is enabled, also save to Firestore
      if (isFirebaseEnabled) {
        try {
          const { collection, addDoc, serverTimestamp } = await import("firebase/firestore")
          const { db } = await import("@/lib/firebase")

          if (db) {
            await addDoc(collection(db, "orders"), {
              ...orderData,
              userId: user.uid,
              createdAt: serverTimestamp(),
            })
          }
        } catch (error) {
          console.error("Error saving to Firestore:", error)
        }
      }

      // Clear cart and show success
      dispatch({ type: "CLEAR_CART" })
      setOrderPlaced(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/orders")
      }, 3000)
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Load saved customer info
  useState(() => {
    if (user && typeof window !== "undefined") {
      const savedInfo = localStorage.getItem(`customerInfo_${user.uid}`)
      if (savedInfo) {
        try {
          const parsedInfo = JSON.parse(savedInfo)
          setCustomerInfo((prev) => ({ ...prev, ...parsedInfo }))
        } catch (error) {
          console.error("Error loading saved customer info:", error)
        }
      }
    }
  })

  if (state.items.length === 0 && !orderPlaced) {
    router.push("/cart")
    return null
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
              <p className="text-gray-600 mb-4">Thank you for your order. We'll prepare it with love!</p>
              <p className="text-sm text-gray-500 mb-4">You can track your order in the "My Orders" section.</p>
              <p className="text-sm text-gray-500">Redirecting to orders page in 3 seconds...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFirebaseEnabled && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Demo Mode: Order will be saved locally. To enable full functionality, configure Firebase.
            </AlertDescription>
          </Alert>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Summary</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            <div className="space-y-3">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-4 bg-green-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-xl font-bold text-green-600">₹{state.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number * (10 digits)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    value={customerInfo.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      handleInputChange("phone", value)
                    }}
                    placeholder="9876543210"
                    className={!validatePhoneNumber(customerInfo.phone) && customerInfo.phone ? "border-red-500" : ""}
                  />
                  {customerInfo.phone && !validatePhoneNumber(customerInfo.phone) && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit mobile number</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="payment">Payment Method *</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">
                        <div className="flex items-center">
                          <Wallet className="h-4 w-4 mr-2" />
                          Cash on Delivery
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Credit/Debit Card
                        </div>
                      </SelectItem>
                      <SelectItem value="upi">
                        <div className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-2" />
                          UPI Payment
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any special instructions for delivery"
                    rows={2}
                  />
                </div>

                <Button
                  onClick={handleConfirmOrder}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Placing Order...
                    </>
                  ) : (
                    "Confirm Order"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
