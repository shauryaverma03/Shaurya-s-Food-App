"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useOrders } from "@/contexts/order-context"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, Star, Package, Truck, CheckCircle, RotateCcw, Navigation } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const { orders } = useOrders()
  const { dispatch } = useCart()
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }
  }, [user, loading, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "preparing":
        return <Package className="h-4 w-4" />
      case "out-for-delivery":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-orange-100 text-orange-800"
      case "out-for-delivery":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleReorder = (order: any) => {
    // Clear current cart
    dispatch({ type: "CLEAR_CART" })

    // Add all items from the order to cart
    order.items.forEach((item: any) => {
      for (let i = 0; i < item.quantity; i++) {
        dispatch({
          type: "ADD_ITEM",
          payload: {
            id: item.id,
            name: item.name,
            price: item.price,
            description: "", // Will be filled from menu data
            image: item.image || "",
            category: "",
            isVeg: true,
            rating: 4.0,
            prepTime: "20-25 mins",
          },
        })
      }
    })

    // Navigate to cart
    router.push("/cart")
  }

  const handleTrackOrder = (orderId: string) => {
    // In a real app, this would navigate to a tracking page
    alert(`Tracking order ${orderId}. This feature will be available soon!`)
  }

  const filteredOrders = selectedStatus === "all" ? orders : orders.filter((order) => order.status === selectedStatus)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your current and past orders</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "pending", "confirmed", "preparing", "out-for-delivery", "delivered"].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className={selectedStatus === status ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {status === "all" ? "All Orders" : status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {selectedStatus === "all"
                  ? "You haven't placed any orders yet. Start by browsing our delicious menu!"
                  : `No orders with status "${selectedStatus.replace("-", " ")}" found.`}
              </p>
              <Link href="/menu">
                <Button className="bg-red-600 hover:bg-red-700">Browse Menu</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                          >
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-gray-600 ml-2">x{item.quantity}</span>
                            </div>
                            <span className="font-semibold">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="font-bold text-lg text-green-600">₹{order.total}</span>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div>
                      <h4 className="font-semibold mb-3">Delivery Information</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="font-medium">{order.customerInfo.name}</p>
                            <p className="text-gray-600">{order.customerInfo.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{order.customerInfo.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            Est. delivery:{" "}
                            {new Date(order.estimatedDelivery).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleTrackOrder(order.id)}
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Track Order
                        </Button>
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm" className="w-full">
                            <Star className="h-4 w-4 mr-2" />
                            Rate Order
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleReorder(order)}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reorder
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
