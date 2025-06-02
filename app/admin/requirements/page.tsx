"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw } from "lucide-react"
import { isFirebaseEnabled } from "@/lib/firebase"

interface Requirement {
  id: string
  name: string
  status: "completed" | "pending" | "in-progress" | "failed"
  comments: string
  priority: "high" | "medium" | "low"
  category: "functionality" | "backend" | "ui-ux" | "performance"
}

export default function RequirementsPage() {
  const [requirements] = useState<Requirement[]>([
    {
      id: "order-summary",
      name: "Order Summary Page (Final Review)",
      status: "completed",
      comments:
        "Implemented comprehensive order summary with customer info, payment method selection, and order review.",
      priority: "high",
      category: "functionality",
    },
    {
      id: "order-submission",
      name: "Order Submission Functionality",
      status: "completed",
      comments:
        "Full order submission logic implemented with validation, Firebase integration, and local storage fallback.",
      priority: "high",
      category: "functionality",
    },
    {
      id: "firebase-integration",
      name: "Firebase Firestore Integration",
      status: isFirebaseEnabled ? "completed" : "pending",
      comments: isFirebaseEnabled
        ? "Firebase is enabled and configured. Menu data can be fetched from Firestore."
        : "Firebase is configured but not enabled. Set useFirebase=true in firebase.ts to activate.",
      priority: "high",
      category: "backend",
    },
    {
      id: "firestore-orders",
      name: "Saving Orders to Firestore",
      status: isFirebaseEnabled ? "completed" : "pending",
      comments: isFirebaseEnabled
        ? "Orders are saved to Firestore when Firebase is enabled, with local storage as fallback."
        : "Order saving logic is implemented but requires Firebase to be enabled.",
      priority: "high",
      category: "backend",
    },
    {
      id: "loading-states",
      name: "Loading States (While Fetching Data)",
      status: "completed",
      comments: "Comprehensive loading states implemented for menu items, cart operations, and order processing.",
      priority: "medium",
      category: "ui-ux",
    },
    {
      id: "error-handling",
      name: "Error Handling (for fetch failures, etc.)",
      status: "completed",
      comments: "Error boundaries, async error handling, and user feedback implemented throughout the application.",
      priority: "high",
      category: "ui-ux",
    },
    {
      id: "cart-functionality",
      name: "Shopping Cart Management",
      status: "completed",
      comments: "Full cart functionality with add/remove items, quantity management, and persistent storage.",
      priority: "high",
      category: "functionality",
    },
    {
      id: "user-authentication",
      name: "User Authentication System",
      status: "completed",
      comments: "Firebase Authentication integrated with email/password login and registration.",
      priority: "high",
      category: "backend",
    },
    {
      id: "responsive-design",
      name: "Responsive Design Implementation",
      status: "completed",
      comments: "Mobile-first responsive design implemented across all pages and components.",
      priority: "medium",
      category: "ui-ux",
    },
    {
      id: "admin-panel",
      name: "Admin Panel for Menu Management",
      status: "completed",
      comments: "Full admin interface for adding, editing, and deleting menu items with real-time updates.",
      priority: "medium",
      category: "functionality",
    },
    {
      id: "order-tracking",
      name: "Order Status Tracking",
      status: "completed",
      comments: "Order tracking system with status updates and order history for users.",
      priority: "medium",
      category: "functionality",
    },
    {
      id: "search-filter",
      name: "Menu Search and Filtering",
      status: "completed",
      comments: "Advanced search and filtering by category, price, rating, and dietary preferences.",
      priority: "medium",
      category: "functionality",
    },
  ])

  const getStatusIcon = (status: Requirement["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "pending":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "failed":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: Requirement["status"]) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      pending: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
    }

    return (
      <Badge className={variants[status]}>
        {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: Requirement["priority"]) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }

    return <Badge className={variants[priority]}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>
  }

  const getCategoryBadge = (category: Requirement["category"]) => {
    const variants = {
      functionality: "bg-blue-100 text-blue-800",
      backend: "bg-purple-100 text-purple-800",
      "ui-ux": "bg-pink-100 text-pink-800",
      performance: "bg-orange-100 text-orange-800",
    }

    const labels = {
      functionality: "Functionality",
      backend: "Backend",
      "ui-ux": "UI/UX",
      performance: "Performance",
    }

    return <Badge className={variants[category]}>{labels[category]}</Badge>
  }

  const stats = {
    total: requirements.length,
    completed: requirements.filter((r) => r.status === "completed").length,
    pending: requirements.filter((r) => r.status === "pending").length,
    inProgress: requirements.filter((r) => r.status === "in-progress").length,
  }

  const completionPercentage = Math.round((stats.completed / stats.total) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Requirements Tracking</h1>
          <p className="text-gray-600">Monitor the implementation status of key features and requirements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requirements</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-red-600">{stats.pending}</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion</p>
                  <p className="text-2xl font-bold text-blue-600">{completionPercentage}%</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600 font-bold">{completionPercentage}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requirements List */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requirements.map((requirement) => (
                <div
                  key={requirement.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(requirement.status)}
                      <h3 className="font-semibold text-gray-900">{requirement.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(requirement.priority)}
                      {getCategoryBadge(requirement.category)}
                      {getStatusBadge(requirement.status)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm ml-8">{requirement.comments}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Firebase Status Alert */}
        {!isFirebaseEnabled && (
          <Card className="mt-6 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">Firebase Not Enabled</h3>
                  <p className="text-yellow-700 text-sm mb-3">
                    Some features are running in demo mode. To enable full Firebase functionality, update the{" "}
                    <code className="bg-yellow-200 px-1 rounded">useFirebase</code> flag in{" "}
                    <code className="bg-yellow-200 px-1 rounded">lib/firebase.ts</code>.
                  </p>
                  <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-800">
                    View Firebase Setup Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
