"use client"

import { Loader2, ShoppingCart, Utensils } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MenuItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-8 w-8" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export function CartLoadingState() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading your cart...</h2>
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-red-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MenuLoadingState() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading delicious menu...</h2>
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-red-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function OrderLoadingState() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600 mb-2" />
        <p className="text-gray-600">Processing your order...</p>
      </div>
    </div>
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600 mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
