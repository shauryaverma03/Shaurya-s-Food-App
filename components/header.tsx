"use client"

import { useState } from "react"
import { ShoppingCart, MapPin, User, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useLocation } from "@/contexts/location-context"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { state } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const { currentLocation, setCurrentLocation, availableLocations } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchLocation, setSearchLocation] = useState("")

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const filteredLocations = searchLocation
    ? availableLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
          location.state.toLowerCase().includes(searchLocation.toLowerCase()),
      )
    : availableLocations

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-red-600">
            FoodieExpress
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-red-600">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600">
              Menu
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600">
              Contact
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-gray-700 hover:text-red-600">
                Admin
              </Link>
            )}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Location Selector */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <MapPin className="h-4 w-4 mr-2 text-red-600" />
                  <span className="text-sm">{currentLocation.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select your location</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder="Search for a city..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="mb-4"
                  />
                  <div className="max-h-60 overflow-y-auto">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        onClick={() => {
                          setCurrentLocation(location)
                          setSearchLocation("")
                        }}
                      >
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-gray-500">{location.state}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">{user.displayName || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart">
              <Button variant="outline" className="relative hidden md:flex">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {itemCount > 0 && <Badge className="absolute -top-2 -right-2 bg-red-600 text-white">{itemCount}</Badge>}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="mb-4">
                  <SheetTitle>
                    <Link href="/" className="text-2xl font-bold text-red-600" onClick={() => setIsMenuOpen(false)}>
                      FoodieExpress
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-4">
                  <Link href="/" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/menu" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    Menu
                  </Link>
                  <Link href="/about" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    About
                  </Link>
                  <Link href="/contact" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="text-lg" onClick={() => setIsMenuOpen(false)}>
                      Admin
                    </Link>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex items-center mb-4">
                      <MapPin className="h-4 w-4 mr-2 text-red-600" />
                      <span>
                        {currentLocation.name}, {currentLocation.state}
                      </span>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          Change Location
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Select your location</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Input
                            placeholder="Search for a city..."
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="mb-4"
                          />
                          <div className="max-h-60 overflow-y-auto">
                            {filteredLocations.map((location) => (
                              <div
                                key={location.id}
                                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                onClick={() => {
                                  setCurrentLocation(location)
                                  setSearchLocation("")
                                  setIsMenuOpen(false)
                                }}
                              >
                                <MapPin className="h-4 w-4 mr-2 text-red-600" />
                                <div>
                                  <p className="font-medium">{location.name}</p>
                                  <p className="text-sm text-gray-500">{location.state}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="pt-4 border-t">
                    {user ? (
                      <div className="space-y-2">
                        <p className="font-medium">{user.displayName || "Account"}</p>
                        <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            Profile
                          </Button>
                        </Link>
                        <Link href="/orders" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            Orders
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-red-600"
                          onClick={() => {
                            handleLogout()
                            setIsMenuOpen(false)
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full">Login / Sign Up</Button>
                      </Link>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full relative">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cart
                        {itemCount > 0 && (
                          <Badge className="absolute -top-2 -right-2 bg-red-600 text-white">{itemCount}</Badge>
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
