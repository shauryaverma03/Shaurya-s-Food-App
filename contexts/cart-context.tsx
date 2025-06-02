"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"
import { isFirebaseEnabled } from "@/lib/firebase"

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category?: string
  isVeg?: boolean
  rating?: number
  prepTime?: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
  error: string | null
}

type CartAction =
  | { type: "ADD_ITEM"; payload: MenuItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartState }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        return {
          ...state,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter((item) => item.id !== action.payload.id)
        return {
          ...state,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }

    case "CLEAR_CART":
      return { ...state, items: [], total: 0 }

    case "SET_CART":
      return { ...state, ...action.payload }

    case "SET_LOADING":
      return { ...state, loading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, loading: false, error: null })
  const { user } = useAuth()

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartKey = user ? `cart_${user.uid}` : "cart_guest"
      const savedCart = localStorage.getItem(cartKey)
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ type: "SET_CART", payload: parsedCart })
        } catch (error) {
          console.error("Error parsing saved cart:", error)
          dispatch({ type: "SET_ERROR", payload: "Error parsing cart data." })
        }
      }
    }
  }, [user])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartKey = user ? `cart_${user.uid}` : "cart_guest"
      localStorage.setItem(cartKey, JSON.stringify(state))
    }
  }, [state, user])

  // Sync with Firestore when user is logged in (only if Firebase is enabled)
  useEffect(() => {
    if (!isFirebaseEnabled || !user) return

    const syncCart = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true })
        const { doc, setDoc, getDoc } = await import("firebase/firestore")
        const { db } = await import("@/lib/firebase")

        if (!db) return

        // Get cart from Firestore
        const cartDoc = await getDoc(doc(db, "userCarts", user.uid))
        if (cartDoc.exists()) {
          const cartData = cartDoc.data() as CartState
          // Only update if the cart is different
          if (JSON.stringify(cartData) !== JSON.stringify(state)) {
            dispatch({ type: "SET_CART", payload: cartData })
          }
        } else if (state.items.length > 0) {
          // If no cart in Firestore but we have items locally, save to Firestore
          await setDoc(doc(db, "userCarts", user.uid), state)
        }
      } catch (error) {
        console.error("Error syncing cart with Firestore:", error)
        dispatch({ type: "SET_ERROR", payload: "Error syncing cart with Firestore." })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    syncCart()
  }, [user])

  // Save cart to Firestore when it changes and user is logged in (only if Firebase is enabled)
  useEffect(() => {
    if (!isFirebaseEnabled || !user) return

    const saveCartToFirestore = async () => {
      try {
        const { doc, setDoc } = await import("firebase/firestore")
        const { db } = await import("@/lib/firebase")

        if (!db) return

        await setDoc(doc(db, "userCarts", user.uid), state)
      } catch (error) {
        console.error("Error saving cart to Firestore:", error)
        dispatch({ type: "SET_ERROR", payload: "Error saving cart to Firestore." })
      }
    }

    saveCartToFirestore()
  }, [state, user])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
