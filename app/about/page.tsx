import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { UtensilsCrossed, Clock, Star, ShieldCheck, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About FoodieExpress</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about bringing delicious food from your favorite restaurants right to your doorstep.
            Founded in 2020, we've been serving communities across India with fast, reliable food delivery.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Restaurant Partners</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">30 min</h3>
              <p className="text-gray-600">Average Delivery</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8/5</h3>
              <p className="text-gray-600">Customer Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                FoodieExpress was born from a simple idea: everyone deserves access to great food, delivered fast. What
                started as a small startup in Surat has grown into one of India's most trusted food delivery platforms.
              </p>
              <p>
                We believe that food brings people together, and our mission is to make that connection as seamless as
                possible. Whether you're craving comfort food on a rainy day or celebrating a special occasion, we're
                here to deliver happiness to your doorstep.
              </p>
              <p>
                Our team works tirelessly to ensure that every order is handled with care, every delivery is on time,
                and every customer experience exceeds expectations.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg mb-6">
              To revolutionize food delivery by connecting communities with their favorite restaurants through
              technology, reliability, and exceptional service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-3" />
                <span>Quality food from trusted restaurants</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3" />
                <span>Fast and reliable delivery</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-3" />
                <span>Safe and secure ordering</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We partner only with restaurants that meet our high standards for food quality and hygiene.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Speed & Reliability</h3>
                <p className="text-gray-600">
                  Your time is valuable. We ensure fast delivery without compromising on food quality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer Centric</h3>
                <p className="text-gray-600">
                  Every decision we make is focused on improving your food delivery experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
          <div className="flex justify-center">
            <Card className="max-w-md">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20241121_161803%202.jpg-CNhmcDZdXuvYOLKlHos32BjAzjk1tZ.jpeg"
                    alt="Shaurya Verma - Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Shaurya Verma</h3>
                <p className="text-red-600 mb-2 font-medium">Lead Developer</p>
                <p className="text-gray-600 text-sm">
                  Passionate developer skilled in Python, web development, and AI, focused on building innovative and
                  impactful tech solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
