"use client"

import { useState } from "react"
import { Plus, Minus, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart, type MenuItem } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0) // Changed to start from 0
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    if (quantity > 0) {
      try {
        for (let i = 0; i < quantity; i++) {
          dispatch({ type: "ADD_ITEM", payload: item })
        }
        // Show success toast
        toast({
          title: "Added to cart!",
          description: `${quantity} ${item.name}${quantity > 1 ? "s" : ""} added to your cart.`,
          duration: 2000,
        })
        setQuantity(0) // Reset to 0 after adding
      } catch (error) {
        console.error("Error adding to cart:", error)
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
          duration: 3000,
        })
      }
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(0, prev - 1))
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img
          src={item.image || "/placeholder.svg?height=200&width=300"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 truncate flex-1">{item.name}</h3>
          {item.isVeg && (
            <div className="flex-shrink-0 ml-2">
              <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-green-600">₹{item.price}</span>
          {item.rating && (
            <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
              <Star className="h-3 w-3 fill-current" />
              <span>{item.rating}</span>
            </div>
          )}
        </div>

        {item.prepTime && (
          <div className="flex items-center space-x-1 text-gray-500 text-sm mb-4">
            <Clock className="h-4 w-4" />
            <span>{item.prepTime}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={decrementQuantity} disabled={quantity <= 0}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button variant="outline" size="sm" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={handleAddToCart} className="bg-red-600 hover:bg-red-700" disabled={quantity === 0}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
