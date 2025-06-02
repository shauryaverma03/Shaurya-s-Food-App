"use client"

import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  ShoppingCart,
  FileText,
  Database,
  AlertTriangle,
  Code,
  GitBranch,
  CheckCircle2,
  Clock,
  Wrench,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Star,
  Package,
} from "lucide-react"

export default function ImprovementsPage() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/admin")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">🔧 Areas for Improvement</h1>
        </div>

        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <Clock className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800">
            This roadmap highlights key areas for future development and enhancement of the Zomato clone application.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          {/* Functionality Implementation */}
          <Card className="border-l-4 border-l-orange-500 shadow-lg">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center text-xl text-orange-800">
                <Wrench className="h-5 w-5 mr-2 text-orange-600" />
                Functionality Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-start">
                  <ShoppingCart className="h-5 w-5 mr-3 text-orange-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Shopping Cart</h3>
                    <p className="text-gray-600">
                      While the UI suggests a cart feature, it's unclear if the functionality for adding items,
                      adjusting quantities, and viewing totals is fully implemented.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-3 text-orange-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Order Summary</h3>
                    <p className="text-gray-600">
                      An order summary or confirmation page would enhance the user experience by allowing users to
                      review their orders before submission.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Backend Integration */}
          <Card className="border-l-4 border-l-blue-500 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-xl text-blue-800">
                <Database className="h-5 w-5 mr-2 text-blue-600" />
                Backend Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Firebase Integration ✅</h3>
                    <p className="text-gray-600">
                      <span className="text-green-600 font-medium">COMPLETED:</span> Firebase has been enabled and
                      configured with environment variables. Next steps include setting up Firestore collections,
                      implementing real-time data syncing, and ensuring proper security rules are in place.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Error Handling</h3>
                    <p className="text-gray-600">
                      Implementing loading states and error messages will improve the app's robustness and user feedback
                      during data operations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Quality and Organization */}
          <Card className="border-l-4 border-l-green-500 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-xl text-green-800">
                <Code className="h-5 w-5 mr-2 text-green-600" />
                Code Quality and Organization
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-start">
                  <GitBranch className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Component Structure</h3>
                    <p className="text-gray-600">
                      Organizing React components logically and ensuring reusability can enhance maintainability.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">State Management</h3>
                    <p className="text-gray-600">
                      Utilizing React hooks effectively for state management will streamline data flow and component
                      interactions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Improvements */}
          <Card className="border-l-4 border-l-purple-500 shadow-lg">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center text-xl text-purple-800">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Additional Enhancements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-start">
                  <Star className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">User Reviews & Ratings</h3>
                    <p className="text-gray-600">
                      Implement a comprehensive review system allowing customers to rate and review menu items,
                      enhancing social proof and user engagement.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-start">
                  <Package className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Real-time Order Tracking</h3>
                    <p className="text-gray-600">
                      Add live order status updates using Firebase real-time capabilities, allowing customers to track
                      their orders from preparation to delivery.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Payment Integration</h3>
                    <p className="text-gray-600">
                      Integrate secure payment gateways like Stripe or Razorpay for seamless online transactions and
                      order processing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
