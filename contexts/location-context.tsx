"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { availableLocations } from "@/lib/firebase"

interface Location {
  id: string
  name: string
  state: string
}

interface LocationContextType {
  currentLocation: Location
  setCurrentLocation: (location: Location) => void
  availableLocations: Location[]
}

const LocationContext = createContext<LocationContextType | null>(null)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location>(availableLocations[0])

  // Load saved location from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocation = localStorage.getItem("currentLocation")
      if (savedLocation) {
        try {
          const parsedLocation = JSON.parse(savedLocation)
          setCurrentLocation(parsedLocation)
        } catch (error) {
          console.error("Error parsing saved location:", error)
        }
      }
    }
  }, [])

  // Save location to localStorage when it changes
  const handleSetLocation = (location: Location) => {
    setCurrentLocation(location)
    if (typeof window !== "undefined") {
      localStorage.setItem("currentLocation", JSON.stringify(location))
    }
  }

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setCurrentLocation: handleSetLocation,
        availableLocations,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
