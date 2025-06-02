"use client"

import { useState } from "react"
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export function EnhancedCartSummary() {
  const { state, dispatch } = useCart()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const updateQuantity = async (id: string, quantity: number) => {
    setIsUpdating(id)
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)) // Simulate loading
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })

      if (quantity === 0) {
        toast({
          title: "Item removed",
          description: "Item has been removed from your cart.",
          duration: 2000,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  const removeItem = async (id: string, itemName: string) => {
    setIsUpdating(id)
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)) // Simulate loading
      dispatch({ type: "REMOVE_ITEM", payload: id })
      toast({
        title: "Item removed",
        description: `${itemName} has been removed from your cart.`,
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  const calculateSavings = () => {
    // Mock savings calculation - could be based on discounts, offers, etc.
    return state.total * 0.1 // 10% savings
  }

  const deliveryFee = state.total > 500 ? 0 : 40
  const finalTotal = state.total + deliveryFee

  if (state.items.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
          <Link href="/menu">
            <Button className="bg-red-600 hover:bg-red-700">Browse Menu</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Order</span>
          <Badge variant="secondary">{state.items.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg border">
              <img
                src={item.image || "/placeholder.svg?height=50&width=50"}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-green-600 font-semibold text-sm">₹{item.price}</p>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={isUpdating === item.id}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm font-medium">
                  {isUpdating === item.id ? "..." : item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={isUpdating === item.id}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id, item.name)}
                disabled={isUpdating === item.id}
                className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{state.total.toFixed(2)}</span>
          </div>

          {calculateSavings() > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Savings</span>
              <span>-₹{calculateSavings().toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className={deliveryFee === 0 ? "text-green-600" : ""}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>

          {deliveryFee === 0 && <p className="text-xs text-green-600">Free delivery on orders above ₹500!</p>}
        </div>

        <Separator />

        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total</span>
          <span className="text-green-600">₹{finalTotal.toFixed(2)}</span>
        </div>

        <Link href="/order-summary" className="block">
          <Button className="w-full bg-red-600 hover:bg-red-700">
            Proceed to Checkout
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
