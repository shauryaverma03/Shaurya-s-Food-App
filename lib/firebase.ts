import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import type { MenuItem } from "@/contexts/cart-context"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Set to false to use demo mode, true to enable Firebase
export const useFirebase = false
export const isFirebaseEnabled = false // Force demo mode for now

// Initialize Firebase conditionally
let app
let auth
let db

if (isFirebaseEnabled) {
  try {
    // Validate all required config values
    const requiredFields = ["apiKey", "authDomain", "projectId"]
    const missingFields = requiredFields.filter((field) => !firebaseConfig[field])

    if (missingFields.length > 0) {
      console.warn(`Missing Firebase config fields: ${missingFields.join(", ")}. Using demo mode.`)
    } else {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
      auth = getAuth(app)
      db = getFirestore(app)
      console.log("Firebase initialized successfully")
    }
  } catch (error) {
    console.error("Error initializing Firebase:", error)
    console.warn("Falling back to demo mode due to Firebase initialization error")
  }
}

// Sample menu items with attractive images - FIXED MISSING IMAGES
export const sampleMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh tomatoes, mozzarella cheese, and aromatic basil leaves",
    price: 299,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "Pizza",
    isVeg: true,
    rating: 4.5,
    prepTime: "25-30 mins",
  },
  {
    id: "2",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken pieces and traditional Indian spices",
    price: 349,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
    category: "Indian",
    isVeg: false,
    rating: 4.7,
    prepTime: "35-40 mins",
  },
  {
    id: "3",
    name: "Gourmet Veg Burger",
    description: "Crispy vegetable patty with fresh lettuce, tomatoes, onions and our special sauce",
    price: 199,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "Burgers",
    isVeg: true,
    rating: 4.2,
    prepTime: "15-20 mins",
  },
  {
    id: "4",
    name: "Chocolate Brownie Delight",
    description: "Rich, fudgy chocolate brownie served warm with vanilla ice cream and chocolate sauce",
    price: 149,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    category: "Desserts",
    isVeg: true,
    rating: 4.8,
    prepTime: "5-10 mins",
  },
  {
    id: "5",
    name: "Paneer Tikka Masala",
    description: "Marinated cottage cheese cubes grilled to perfection in rich, creamy tomato gravy",
    price: 279,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    category: "Indian",
    isVeg: true,
    rating: 4.6,
    prepTime: "20-25 mins",
  },
  {
    id: "6",
    name: "Hakka Chicken Noodles",
    description: "Stir-fried noodles with tender chicken pieces and fresh vegetables in savory sauce",
    price: 249,
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
    category: "Chinese",
    isVeg: false,
    rating: 4.3,
    prepTime: "15-20 mins",
  },
  {
    id: "7",
    name: "Caesar Salad Supreme",
    description: "Fresh romaine lettuce with parmesan cheese, croutons, and classic caesar dressing",
    price: 229,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    category: "Salads",
    isVeg: true,
    rating: 4.1,
    prepTime: "10-15 mins",
  },
  {
    id: "8",
    name: "Pepperoni Pizza",
    description: "Classic pizza topped with spicy pepperoni slices and melted mozzarella cheese",
    price: 349,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    category: "Pizza",
    isVeg: false,
    rating: 4.6,
    prepTime: "25-30 mins",
  },
  {
    id: "9",
    name: "Butter Chicken",
    description: "Tender chicken pieces in rich, creamy tomato-based curry with aromatic spices",
    price: 329,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop",
    category: "Indian",
    isVeg: false,
    rating: 4.7,
    prepTime: "30-35 mins",
  },
  {
    id: "10",
    name: "Chicken Burger Deluxe",
    description: "Grilled chicken breast with lettuce, tomato, cheese and our signature sauce",
    price: 259,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    category: "Burgers",
    isVeg: false,
    rating: 4.4,
    prepTime: "18-22 mins",
  },
  {
    id: "11",
    name: "Veg Fried Rice",
    description: "Fragrant basmati rice stir-fried with mixed vegetables and aromatic spices",
    price: 189,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    category: "Chinese",
    isVeg: true,
    rating: 4.2,
    prepTime: "15-20 mins",
  },
  {
    id: "12",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
    price: 179,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    category: "Desserts",
    isVeg: true,
    rating: 4.5,
    prepTime: "5-8 mins",
  },
  {
    id: "13",
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink blended with sweet mango pulp and cardamom",
    price: 89,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    category: "Beverages",
    isVeg: true,
    rating: 4.3,
    prepTime: "5 mins",
  },
  {
    id: "14",
    name: "Garlic Bread",
    description: "Crispy bread slices topped with garlic butter, herbs and melted cheese",
    price: 129,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop",
    category: "Sides",
    isVeg: true,
    rating: 4.0,
    prepTime: "10-12 mins",
  },
  {
    id: "15",
    name: "Tom Yum Soup",
    description: "Spicy and sour Thai soup with mushrooms, lemongrass and aromatic herbs",
    price: 159,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    category: "Soups",
    isVeg: true,
    rating: 4.4,
    prepTime: "12-15 mins",
  },
  {
    id: "16",
    name: "Pasta Carbonara",
    description: "Creamy Italian pasta with bacon, eggs, parmesan cheese and black pepper",
    price: 289,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
    category: "Italian",
    isVeg: false,
    rating: 4.5,
    prepTime: "20-25 mins",
  },
  {
    id: "17",
    name: "Chicken Tacos",
    description: "Soft tortillas filled with seasoned chicken, lettuce, cheese and salsa",
    price: 219,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    category: "Mexican",
    isVeg: false,
    rating: 4.3,
    prepTime: "15-18 mins",
  },
  {
    id: "18",
    name: "Pad Thai",
    description: "Traditional Thai stir-fried noodles with shrimp, tofu, bean sprouts and peanuts",
    price: 269,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop",
    category: "Thai",
    isVeg: false,
    rating: 4.6,
    prepTime: "18-22 mins",
  },
  {
    id: "19",
    name: "Sushi Platter",
    description: "Fresh assorted sushi rolls with salmon, tuna, and vegetables served with wasabi",
    price: 399,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    category: "Japanese",
    isVeg: false,
    rating: 4.8,
    prepTime: "25-30 mins",
  },
  {
    id: "20",
    name: "Fresh Fruit Smoothie",
    description: "Healthy blend of seasonal fruits with yogurt and honey",
    price: 119,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
    category: "Beverages",
    isVeg: true,
    rating: 4.2,
    prepTime: "5-8 mins",
  },
]

// User management functions for security
export const saveUserData = (userData: any) => {
  if (typeof window !== "undefined") {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const existingUserIndex = users.findIndex((user: any) => user.email === userData.email)

    if (existingUserIndex !== -1) {
      users[existingUserIndex] = { ...users[existingUserIndex], ...userData }
    } else {
      users.push(userData)
    }

    localStorage.setItem("registeredUsers", JSON.stringify(users))
  }
}

export const getUserByEmail = (email: string) => {
  if (typeof window !== "undefined") {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    return users.find((user: any) => user.email === email)
  }
  return null
}

export const validateUserCredentials = (email: string, password: string) => {
  const user = getUserByEmail(email)
  return user && user.password === password
}

// Firebase authentication functions
export const loginWithEmail = async (email: string, password: string) => {
  if (!isFirebaseEnabled) {
    // Demo mode login with validation
    const user = getUserByEmail(email)
    if (!user) {
      throw new Error("auth/user-not-found")
    }
    if (!validateUserCredentials(email, password)) {
      throw new Error("auth/wrong-password")
    }
    return { user: { uid: user.uid || "demo-user", email, displayName: user.displayName } }
  }

  if (!auth) throw new Error("Firebase auth not initialized")
  return await signInWithEmailAndPassword(auth, email, password)
}

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  if (!isFirebaseEnabled) {
    // Demo mode registration
    const existingUser = getUserByEmail(email)
    if (existingUser) {
      throw new Error("auth/email-already-in-use")
    }

    const userData = {
      uid: `demo-${Date.now()}`,
      email,
      displayName,
      password, // In real app, this should be hashed
      createdAt: new Date().toISOString(),
    }

    saveUserData(userData)
    return { user: { uid: userData.uid, email, displayName } }
  }

  if (!auth) throw new Error("Firebase auth not initialized")
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const logoutUser = async () => {
  if (!isFirebaseEnabled) {
    // Demo mode logout
    return true
  }

  if (!auth) throw new Error("Firebase auth not initialized")
  await signOut(auth)
  return true
}

// Menu item functions
export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    let items: MenuItem[] = [...sampleMenuItems]

    // Add custom items from localStorage
    if (typeof window !== "undefined") {
      const customItems = localStorage.getItem("customMenuItems")
      if (customItems) {
        try {
          const parsedCustomItems = JSON.parse(customItems)
          items = [...items, ...parsedCustomItems]
        } catch (error) {
          console.error("Error parsing custom items:", error)
        }
      }

      // Apply updates to sample items
      const updatedSampleItems = localStorage.getItem("updatedSampleItems")
      if (updatedSampleItems) {
        try {
          const updates = JSON.parse(updatedSampleItems)
          items = items.map((item) => {
            const update = updates[item.id]
            return update ? { ...item, ...update } : item
          })
        } catch (error) {
          console.error("Error parsing updated items:", error)
        }
      }

      // Remove deleted items
      const deletedItems = localStorage.getItem("deletedSampleItems")
      if (deletedItems) {
        try {
          const deletedIds = JSON.parse(deletedItems)
          items = items.filter((item) => !deletedIds.includes(item.id))
        } catch (error) {
          console.error("Error parsing deleted items:", error)
        }
      }
    }

    return items
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return sampleMenuItems
  }
}

// Add a new menu item
export async function addMenuItem(item: Omit<MenuItem, "id">): Promise<string> {
  const newId = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const newItem = { ...item, id: newId }

  if (typeof window !== "undefined") {
    try {
      const existingItems = localStorage.getItem("customMenuItems")
      const items = existingItems ? JSON.parse(existingItems) : []
      items.push(newItem)
      localStorage.setItem("customMenuItems", JSON.stringify(items))

      // Dispatch event for real-time updates
      window.dispatchEvent(
        new CustomEvent("menuItemAdded", {
          detail: newItem,
        }),
      )
    } catch (error) {
      console.error("Error adding menu item:", error)
      throw error
    }
  }

  return newId
}

// Update an existing menu item
export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      // Check if it's a custom item
      const customItems = localStorage.getItem("customMenuItems")
      if (customItems) {
        const items = JSON.parse(customItems)
        const itemIndex = items.findIndex((item: MenuItem) => item.id === id)
        if (itemIndex !== -1) {
          items[itemIndex] = { ...items[itemIndex], ...updates }
          localStorage.setItem("customMenuItems", JSON.stringify(items))

          // Dispatch event for real-time updates
          window.dispatchEvent(
            new CustomEvent("menuItemUpdated", {
              detail: { id, updates },
            }),
          )
          return
        }
      }

      // If it's a sample item, store the update separately
      const updatedSampleItems = localStorage.getItem("updatedSampleItems")
      const existingUpdates = updatedSampleItems ? JSON.parse(updatedSampleItems) : {}
      existingUpdates[id] = { ...existingUpdates[id], ...updates }
      localStorage.setItem("updatedSampleItems", JSON.stringify(existingUpdates))

      // Dispatch event for real-time updates
      window.dispatchEvent(
        new CustomEvent("menuItemUpdated", {
          detail: { id, updates },
        }),
      )
    } catch (error) {
      console.error("Error updating menu item:", error)
      throw error
    }
  }
}

// Delete a menu item
export async function deleteMenuItem(id: string): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      // Check if it's a custom item
      const customItems = localStorage.getItem("customMenuItems")
      if (customItems) {
        const items = JSON.parse(customItems)
        const filteredItems = items.filter((item: MenuItem) => item.id !== id)
        if (filteredItems.length !== items.length) {
          localStorage.setItem("customMenuItems", JSON.stringify(filteredItems))

          // Dispatch event for real-time updates
          window.dispatchEvent(
            new CustomEvent("menuItemDeleted", {
              detail: id,
            }),
          )
          return
        }
      }

      // If it's a sample item, mark it as deleted
      const deletedItems = localStorage.getItem("deletedSampleItems")
      const existingDeleted = deletedItems ? JSON.parse(deletedItems) : []
      if (!existingDeleted.includes(id)) {
        existingDeleted.push(id)
        localStorage.setItem("deletedSampleItems", JSON.stringify(existingDeleted))

        // Dispatch event for real-time updates
        window.dispatchEvent(
          new CustomEvent("menuItemDeleted", {
            detail: id,
          }),
        )
      }
    } catch (error) {
      console.error("Error deleting menu item:", error)
      throw error
    }
  }
}

export { app, auth, db }

// Available locations
export const availableLocations = [
  { id: "surat", name: "Surat", state: "Gujarat" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { id: "delhi", name: "Delhi", state: "Delhi" },
  { id: "bangalore", name: "Bangalore", state: "Karnataka" },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal" },
  { id: "pune", name: "Pune", state: "Maharashtra" },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat" },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan" },
]
