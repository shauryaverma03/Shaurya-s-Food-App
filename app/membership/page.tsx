"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Star, Zap, Gift, Truck, Shield } from "lucide-react"
import Link from "next/link"

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly")

  const plans = {
    monthly: {
      basic: { price: 49, originalPrice: 99 },
      premium: { price: 99, originalPrice: 199 },
      gold: { price: 149, originalPrice: 299 },
    },
    annual: {
      basic: { price: 399, originalPrice: 999, savings: 600 },
      premium: { price: 799, originalPrice: 1999, savings: 1200 },
      gold: { price: 1199, originalPrice: 2999, savings: 1800 },
    },
  }

  const currentPlans = plans[selectedPlan]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-yellow-300 mr-4" />
            <h1 className="text-5xl font-bold">FoodieExpress Membership</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join our exclusive membership program and enjoy incredible savings, faster delivery, and premium perks!
          </p>
          <div className="flex items-center justify-center space-x-2 text-yellow-300">
            <Star className="h-6 w-6 fill-current" />
            <span className="text-lg font-semibold">Over 50,000+ Happy Members</span>
            <Star className="h-6 w-6 fill-current" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Plan Toggle */}
        <div className="text-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedPlan === "monthly"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("annual")}
              className={`px-8 py-3 rounded-full font-semibold transition-all relative ${
                selectedPlan === "annual"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">Save 60%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Basic Plan */}
          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-center py-8">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 mr-2" />
                <CardTitle className="text-2xl">Basic</CardTitle>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">₹{currentPlans.basic.price}</div>
                <div className="text-blue-100">
                  <span className="line-through">₹{currentPlans.basic.originalPrice}</span>
                  <span className="ml-2 text-sm">per {selectedPlan === "monthly" ? "month" : "year"}</span>
                </div>
                {selectedPlan === "annual" && (
                  <Badge className="bg-green-500 text-white">Save ₹{currentPlans.basic.savings}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Free delivery on orders above ₹199</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>5% cashback on all orders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Monthly exclusive deals</span>
                </li>
              </ul>
              <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-lg py-3">Choose Basic</Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-500">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-semibold">
              MOST POPULAR
            </div>
            <CardHeader className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-center py-8 mt-8">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 mr-2 fill-current" />
                <CardTitle className="text-2xl">Premium</CardTitle>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">₹{currentPlans.premium.price}</div>
                <div className="text-purple-100">
                  <span className="line-through">₹{currentPlans.premium.originalPrice}</span>
                  <span className="ml-2 text-sm">per {selectedPlan === "monthly" ? "month" : "year"}</span>
                </div>
                {selectedPlan === "annual" && (
                  <Badge className="bg-green-500 text-white">Save ₹{currentPlans.premium.savings}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Free delivery on all orders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>10% cashback on all orders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Express delivery (20 mins)</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Weekly exclusive deals</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Access to premium restaurants</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>24/7 priority support</span>
                </li>
              </ul>
              <Button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3">
                Choose Premium
              </Button>
            </CardContent>
          </Card>

          {/* Gold Plan */}
          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-center py-8">
              <div className="flex items-center justify-center mb-4">
                <Crown className="h-8 w-8 mr-2" />
                <CardTitle className="text-2xl">Gold</CardTitle>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">₹{currentPlans.gold.price}</div>
                <div className="text-yellow-100">
                  <span className="line-through">₹{currentPlans.gold.originalPrice}</span>
                  <span className="ml-2 text-sm">per {selectedPlan === "monthly" ? "month" : "year"}</span>
                </div>
                {selectedPlan === "annual" && (
                  <Badge className="bg-green-500 text-white">Save ₹{currentPlans.gold.savings}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Free delivery on all orders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>15% cashback on all orders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Lightning delivery (15 mins)</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Daily exclusive deals</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>VIP restaurant access</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Personal food concierge</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Monthly surprise gifts</span>
                </li>
              </ul>
              <Button className="w-full mt-8 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-lg py-3">
                Choose Gold
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join FoodieExpress Membership?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Faster Delivery</h3>
              <p className="text-gray-600">Get your food delivered in record time with our express delivery service.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
              <p className="text-gray-600">Access member-only discounts and special offers from top restaurants.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Support</h3>
              <p className="text-gray-600">Get priority customer support and dedicated assistance whenever you need.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of members who are already enjoying premium benefits!
          </p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold shadow-xl">
              Get Started Now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
