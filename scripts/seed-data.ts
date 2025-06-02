// This script can be used to populate your Firestore with sample menu data
// Run this once to add sample food items to your menuItems collection

import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const sampleMenuItems = [
  {
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves",
    price: 299,
    image: "/placeholder.svg?height=200&width=300",
    category: "Pizza",
    isVeg: true,
    rating: 4.5,
    prepTime: "25-30 mins",
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and traditional spices",
    price: 349,
    image: "/placeholder.svg?height=200&width=300",
    category: "Indian",
    isVeg: false,
    rating: 4.7,
    prepTime: "35-40 mins",
  },
  {
    name: "Veg Burger",
    description: "Crispy vegetable patty with fresh lettuce, tomatoes, and special sauce",
    price: 199,
    image: "/placeholder.svg?height=200&width=300",
    category: "Burgers",
    isVeg: true,
    rating: 4.2,
    prepTime: "15-20 mins",
  },
  {
    name: "Chicken Tikka Masala",
    description: "Tender chicken pieces in rich, creamy tomato-based curry",
    price: 279,
    image: "/placeholder.svg?height=200&width=300",
    category: "Indian",
    isVeg: false,
    rating: 4.6,
    prepTime: "30-35 mins",
  },
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing",
    price: 229,
    image: "/placeholder.svg?height=200&width=300",
    category: "Salads",
    isVeg: true,
    rating: 4.1,
    prepTime: "10-15 mins",
  },
  {
    name: "Chocolate Brownie",
    description: "Rich, fudgy chocolate brownie served with vanilla ice cream",
    price: 149,
    image: "/placeholder.svg?height=200&width=300",
    category: "Desserts",
    isVeg: true,
    rating: 4.8,
    prepTime: "5-10 mins",
  },
  {
    name: "Fish & Chips",
    description: "Crispy battered fish served with golden french fries and tartar sauce",
    price: 329,
    image: "/placeholder.svg?height=200&width=300",
    category: "Seafood",
    isVeg: false,
    rating: 4.3,
    prepTime: "25-30 mins",
  },
  {
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes in rich, creamy tomato and butter gravy",
    price: 259,
    image: "/placeholder.svg?height=200&width=300",
    category: "Indian",
    isVeg: true,
    rating: 4.4,
    prepTime: "20-25 mins",
  },
]

export async function seedMenuData() {
  try {
    console.log("Adding sample menu items to Firestore...")

    for (const item of sampleMenuItems) {
      await addDoc(collection(db, "menuItems"), item)
      console.log(`Added: ${item.name}`)
    }

    console.log("✅ Sample menu data added successfully!")
  } catch (error) {
    console.error("❌ Error adding sample data:", error)
  }
}
