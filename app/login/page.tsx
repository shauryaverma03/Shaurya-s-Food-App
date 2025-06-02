"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, signUp, user } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      await signIn(email, password)
      router.push("/")
    } catch (error: any) {
      console.error("Login error:", error)
      // If user not found, suggest signup
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up first.")
        setActiveTab("signup")
      } else {
        setError(getAuthErrorMessage(error.code))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!name.trim() || !email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters")
      setLoading(false)
      return
    }

    try {
      await signUp(email, password, name)
      router.push("/")
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(getAuthErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const getAuthErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address"
      case "auth/user-disabled":
        return "This account has been disabled"
      case "auth/user-not-found":
        return "No account found with this email. Please sign up first."
      case "auth/wrong-password":
        return "Incorrect password"
      case "auth/email-already-in-use":
        return "Email already in use"
      case "auth/weak-password":
        return "Password should be at least 6 characters"
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later."
      default:
        return "An error occurred. Please try again"
    }
  }

  // Demo credentials info
  const demoCredentials = (
    <Alert className="mb-4 bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Demo Mode:</strong> You can use any email and password to test the application.
        <br />
        Try: admin@foodieexpress.com (for admin access) or any email for regular user.
      </AlertDescription>
    </Alert>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto px-4 py-16">
        {demoCredentials}

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-red-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button onClick={() => setActiveTab("signup")} className="text-red-600 hover:underline font-medium">
                    Sign up here
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join FoodieExpress and start ordering delicious food</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button onClick={() => setActiveTab("login")} className="text-red-600 hover:underline font-medium">
                    Login here
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
