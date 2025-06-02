"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  orderNumber: string
  items: OrderItem[]
  total: number
  status: "pending" | "confirmed" | "preparing" | "out-for-delivery" | "delivered" | "cancelled"
  createdAt: string
  estimatedDelivery: string
  customerInfo: {
    name: string
    phone: string
    address: string
    notes?: string
  }
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt">) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getOrderById: (orderId: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = useAuth()

  // Load orders from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const savedOrders = localStorage.getItem(`orders_${user.uid}`)
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders))
        } catch (error) {
          console.error("Error parsing saved orders:", error)
        }
      }
    }
  }, [user])

  // Save orders to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(orders))
    }
  }, [orders, user])

  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      orderNumber: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId)
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderById }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
