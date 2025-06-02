"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import MenuItemCard from "@/components/MenuItemCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocation } from "@/contexts/location-context"
import { getAllMenuItems } from "@/lib/actions/menu-item.actions"
import { Loader2, Search, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { MenuItem } from "@/contexts/cart-context"
import { sampleMenuItems } from "@/lib/firebase"

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showVegOnly, setShowVegOnly] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [ratingFilter, setRatingFilter] = useState(0)
  const { currentLocation } = useLocation()

  const categories = [
    "All",
    "Pizza",
    "Indian",
    "Burgers",
    "Chinese",
    "Salads",
    "Desserts",
    "Beverages",
    "Sides",
    "Soups",
  ]

  // Filter menu items based on search query, selected category, and filters
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesVeg = showVegOnly ? item.isVeg === true : true
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    const matchesRating = item.rating ? item.rating >= ratingFilter : true

    return matchesSearch && matchesCategory && matchesVeg && matchesPrice && matchesRating
  })

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const items = await getAllMenuItems()
      setMenuItems(items)
    } catch (error) {
      console.error("Error fetching menu items:", error)
      setMenuItems(sampleMenuItems)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuItems()

    // Listen for real-time updates from admin panel
    const handleMenuItemAdded = (event: CustomEvent) => {
      const newItem = event.detail
      setMenuItems((prev) => [...prev, newItem])
    }

    const handleMenuItemUpdated = (event: CustomEvent) => {
      const { id, updates } = event.detail
      setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
    }

    const handleMenuItemDeleted = (event: CustomEvent) => {
      const deletedItemId = event.detail
      setMenuItems((prev) => prev.filter((item) => item.id !== deletedItemId))
    }

    // Listen for storage changes (cross-tab updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "customMenuItems" || event.key === "updatedSampleItems" || event.key === "deletedSampleItems") {
        fetchMenuItems()
      }
    }

    window.addEventListener("menuItemAdded", handleMenuItemAdded as EventListener)
    window.addEventListener("menuItemUpdated", handleMenuItemUpdated as EventListener)
    window.addEventListener("menuItemDeleted", handleMenuItemDeleted as EventListener)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("menuItemAdded", handleMenuItemAdded as EventListener)
      window.removeEventListener("menuItemUpdated", handleMenuItemUpdated as EventListener)
      window.removeEventListener("menuItemDeleted", handleMenuItemDeleted as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          <span className="ml-2 text-lg">Loading delicious food...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Food Delivery in {currentLocation?.name || "Your Area"}
          </h1>
          <p className="text-gray-600">Discover delicious food from top restaurants in your area</p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:w-auto w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Dietary</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="veg-only"
                        checked={showVegOnly}
                        onCheckedChange={(checked) => setShowVegOnly(checked as boolean)}
                      />
                      <Label htmlFor="veg-only">Vegetarian Only</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={50}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Minimum Rating</h3>
                    <div className="flex items-center space-x-4">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <Button
                          key={rating}
                          variant={ratingFilter === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRatingFilter(rating)}
                          className={ratingFilter === rating ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                          {rating === 0 ? "All" : `${rating}+`}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setShowVegOnly(false)
                      setPriceRange([0, 1000])
                      setRatingFilter(0)
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Category Filters */}
          <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${selectedCategory === category ? "bg-red-600 hover:bg-red-700" : ""} whitespace-nowrap`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredMenuItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {searchQuery ||
              selectedCategory !== "All" ||
              showVegOnly ||
              ratingFilter > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 1000
                ? "No items found matching your criteria"
                : "No menu items available"}
            </p>
            {(searchQuery ||
              selectedCategory !== "All" ||
              showVegOnly ||
              ratingFilter > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 1000) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setShowVegOnly(false)
                  setPriceRange([0, 1000])
                  setRatingFilter(0)
                }}
                className="mt-4"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
