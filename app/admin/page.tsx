"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const AdminPage = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/admin/users")}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">User Management</h3>
                <p className="text-gray-600 text-sm">Manage user accounts and roles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push("/admin/products")}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Product Management</h3>
                <p className="text-gray-600 text-sm">Add, edit, and remove products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push("/admin/requirements")}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Requirements Tracking</h3>
                <p className="text-gray-600 text-sm">Monitor implementation status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPage
