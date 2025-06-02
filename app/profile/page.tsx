"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Edit, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      setProfileData({
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        address: "",
        bio: "",
      })
    }
  }, [user, loading, router])

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // In a real app, this would save to the database
    setEditing(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleCancel = () => {
    setEditing(false)
    // Reset to original data
    if (user) {
      setProfileData({
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        address: "",
        bio: "",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">Profile updated successfully!</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{profileData.name || "User"}</h2>
                <p className="text-gray-600 mb-4">{profileData.email}</p>
                <Button
                  onClick={() => setEditing(!editing)}
                  variant={editing ? "outline" : "default"}
                  className={editing ? "" : "bg-red-600 hover:bg-red-700"}
                >
                  {editing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders:</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Favorite Cuisine:</span>
                    <span className="font-semibold">Indian</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-semibold">Jan 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!editing}
                      className={editing ? "" : "bg-gray-50"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profileData.email} disabled={true} className="bg-gray-50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!editing}
                      className={editing ? "" : "bg-gray-50"}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!editing}
                      className={editing ? "" : "bg-gray-50"}
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!editing}
                    className={editing ? "" : "bg-gray-50"}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                {editing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive order updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Receive delivery updates via SMS</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-600">Receive offers and promotions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
