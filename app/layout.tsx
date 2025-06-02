import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { LocationProvider } from "@/contexts/location-context"
import { OrderProvider } from "@/contexts/order-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FoodieExpress - Food Delivery App",
  description: "Order delicious food online with fast delivery",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <LocationProvider>
              <OrderProvider>
                <CartProvider>
                  {children}
                  <Toaster />
                </CartProvider>
              </OrderProvider>
            </LocationProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
