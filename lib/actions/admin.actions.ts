import { addMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/actions/menu-item.actions"

// Client action to add a new menu item
export async function handleAddMenuItem(formData: FormData) {
  try {
    const newItem = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      image: (formData.get("image") as string) || undefined,
      category: formData.get("category") as string,
      isVeg: formData.get("isVeg") === "true",
      rating: formData.get("rating") ? Number(formData.get("rating")) : undefined,
      prepTime: formData.get("prepTime") as string,
    }

    const result = await addMenuItem(newItem)
    return { success: true, item: result }
  } catch (error) {
    console.error("Error adding menu item:", error)
    return { success: false, error: "Failed to add menu item" }
  }
}

// Client action to update a menu item
export async function handleUpdateMenuItem(id: string, formData: FormData) {
  try {
    const updates = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      image: (formData.get("image") as string) || undefined,
      category: formData.get("category") as string,
      isVeg: formData.get("isVeg") === "true",
      rating: formData.get("rating") ? Number(formData.get("rating")) : undefined,
      prepTime: formData.get("prepTime") as string,
    }

    await updateMenuItem(id, updates)
    return { success: true }
  } catch (error) {
    console.error("Error updating menu item:", error)
    return { success: false, error: "Failed to update menu item" }
  }
}

// Client action to delete a menu item
export async function handleDeleteMenuItem(id: string) {
  try {
    await deleteMenuItem(id)
    return { success: true }
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return { success: false, error: "Failed to delete menu item" }
  }
}
