"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is always ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message here..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
              <div className="rounded-lg overflow-hidden h-[400px] shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59578.44339391736!2d72.7882406!3d21.1591425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1654321234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Foodie Express Location"
                ></iframe>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-600">123 Food Street, Citylight, Surat, Gujarat 395007</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">contact@foodieexpress.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Hours</h4>
                    <p className="text-gray-600">Monday - Sunday: 10:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border border-red-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Directions</h3>
              <p className="text-gray-600 mb-4">
                Use your favorite map app to navigate to our restaurant for a delicious meal.
              </p>
              <a
                href="https://goo.gl/maps/1JyKGQFYQfZ2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
