"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { isFirebaseEnabled, saveUserData, getUserByEmail, validateUserCredentials } from "@/lib/firebase"

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Admin emails - in a real app, this would be stored in a secure database
  const adminEmails = ["admin@foodieexpress.com", "admin@test.com", "test@admin.com"]

  useEffect(() => {
    if (!isFirebaseEnabled) {
      // In demo mode, check localStorage for user
      const savedUser = localStorage.getItem("demoUser")
      const savedAdminStatus = localStorage.getItem("isAdmin")
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
          if (savedAdminStatus) {
            setIsAdmin(JSON.parse(savedAdminStatus))
          } else {
            setIsAdmin(adminEmails.includes(parsedUser.email || ""))
          }
        } catch (error) {
          console.error("Error parsing saved user:", error)
        }
      }
      setLoading(false)
      return
    }

    // Firebase auth state listener with better error handling
    const setupAuthListener = async () => {
      try {
        // Check if Firebase is properly configured
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
          console.warn("Firebase API key not found, falling back to demo mode")
          setLoading(false)
          return
        }

        const { onAuthStateChanged } = await import("firebase/auth")
        const { auth } = await import("@/lib/firebase")

        if (auth) {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              setUser({
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
              })
              setIsAdmin(adminEmails.includes(currentUser.email || ""))
            } else {
              setUser(null)
              setIsAdmin(false)
            }
            setLoading(false)
          })

          return unsubscribe
        } else {
          console.warn("Firebase auth not initialized, falling back to demo mode")
          setLoading(false)
        }
      } catch (error) {
        console.error("Error setting up auth listener:", error)
        console.warn("Falling back to demo mode due to Firebase configuration error")
        setLoading(false)
      }
    }

    setupAuthListener()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    // Force demo mode for now
    const existingUser = getUserByEmail(email)
    if (existingUser) {
      throw new Error("auth/email-already-in-use")
    }

    const demoUser = {
      uid: `demo-${Date.now()}`,
      email,
      displayName: name,
      password, // In real app, this should be hashed
      createdAt: new Date().toISOString(),
    }

    // Save user data
    saveUserData(demoUser)

    setUser({
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
    })

    const isUserAdmin = adminEmails.includes(email)
    setIsAdmin(isUserAdmin)
    localStorage.setItem(
      "demoUser",
      JSON.stringify({
        uid: demoUser.uid,
        email: demoUser.email,
        displayName: demoUser.displayName,
      }),
    )
    localStorage.setItem("isAdmin", JSON.stringify(isUserAdmin))
    return
  }

  const signIn = async (email: string, password: string) => {
    // Force demo mode for now
    const user = getUserByEmail(email)
    if (!user) {
      throw new Error("auth/user-not-found")
    }

    if (!validateUserCredentials(email, password)) {
      throw new Error("auth/wrong-password")
    }

    const demoUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }

    setUser(demoUser)
    const isUserAdmin = adminEmails.includes(email)
    setIsAdmin(isUserAdmin)
    localStorage.setItem("demoUser", JSON.stringify(demoUser))
    localStorage.setItem("isAdmin", JSON.stringify(isUserAdmin))
    return
  }

  const logout = async () => {
    if (!isFirebaseEnabled) {
      // Demo mode logout
      setUser(null)
      setIsAdmin(false)
      localStorage.removeItem("demoUser")
      localStorage.removeItem("isAdmin")
      return
    }

    try {
      const { signOut } = await import("firebase/auth")
      const { auth } = await import("@/lib/firebase")

      if (!auth) throw new Error("Firebase auth not initialized")

      await signOut(auth)
      setUser(null)
      setIsAdmin(false)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, isAdmin }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
