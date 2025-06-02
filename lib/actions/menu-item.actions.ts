import type { MenuItem } from "@/contexts/cart-context"
import { sampleMenuItems } from "@/lib/firebase"

// Get all menu items (combines sample data with custom items)
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
export async function addMenuItem(item: Omit<MenuItem, "id">): Promise<MenuItem> {
  const newItem: MenuItem = {
    ...item,
    id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }

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

  return newItem
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

// Get a single menu item by ID
export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const items = await getAllMenuItems()
  return items.find((item) => item.id === id) || null
}

// Search menu items
export async function searchMenuItems(query: string): Promise<MenuItem[]> {
  const items = await getAllMenuItems()
  const lowercaseQuery = query.toLowerCase()

  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      (item.category && item.category.toLowerCase().includes(lowercaseQuery)),
  )
}

// Get menu items by category
export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  const items = await getAllMenuItems()

  if (category === "All") {
    return items
  }

  return items.filter((item) => item.category === category)
}
