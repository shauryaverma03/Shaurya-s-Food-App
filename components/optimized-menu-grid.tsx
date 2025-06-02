"use client"

import { useState, useMemo, useCallback } from "react"
import { Search, Filter, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MenuItemCard } from "./menu-item-card"
import { MenuItemSkeleton } from "./loading-states"
import { ErrorBoundary } from "./error-boundary"
import type { MenuItem } from "@/contexts/cart-context"

interface OptimizedMenuGridProps {
  items: MenuItem[]
  loading?: boolean
  error?: string | null
}

export function OptimizedMenuGrid({ items, loading = false, error = null }: OptimizedMenuGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [filterVeg, setFilterVeg] = useState<boolean>(false)

  // Memoized categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((item) => item.category).filter(Boolean)))
    return ["all", ...cats]
  }, [items])

  // Memoized filtered and sorted items
  const filteredItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesVeg = !filterVeg || item.isVeg

      return matchesSearch && matchesCategory && matchesVeg
    })

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [items, searchTerm, selectedCategory, sortBy, filterVeg])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading menu items: {error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for dishes..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={filterVeg ? "default" : "outline"}
                onClick={() => setFilterVeg(!filterVeg)}
                className="whitespace-nowrap"
              >
                🌱 Veg Only
              </Button>
            </div>
          </div>

          {/* Active filters */}
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                Search: {searchTerm} ×
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("all")}>
                Category: {selectedCategory} ×
              </Badge>
            )}
            {filterVeg && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setFilterVeg(false)}>
                Veg Only ×
              </Badge>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">{loading ? "Loading..." : `${filteredItems.length} items found`}</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Show skeleton loading
            Array.from({ length: 8 }).map((_, index) => <MenuItemSkeleton key={index} />)
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => <MenuItemCard key={item.id} item={item} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setFilterVeg(false)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
