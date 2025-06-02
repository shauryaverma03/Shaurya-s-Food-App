import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import {
  ArrowRight,
  UtensilsCrossed,
  Clock,
  Star,
  ShieldCheck,
  Sparkles,
  Instagram,
  Github,
  Linkedin,
  Globe,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&opacity=0.3')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 text-yellow-300">
                <Sparkles className="h-6 w-6" />
                <span className="text-lg font-semibold">Premium Food Delivery</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Delicious Food
                <span className="block text-yellow-300">Delivered Fresh</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Experience the finest culinary delights from top-rated restaurants, delivered hot and fresh to your
                doorstep in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
                  >
                    Order Now
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/membership">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                  >
                    Join FoodieExpress
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop"
                alt="Delicious food spread"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        ></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FoodieExpress?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best food delivery experience with quality, speed, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Premium Quality</h3>
              <p className="text-gray-600 text-lg">
                We partner with the finest restaurants to ensure you get the highest quality meals every time.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-600 text-lg">
                Our efficient delivery network ensures your food arrives hot and fresh in record time.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">100% Secure</h3>
              <p className="text-gray-600 text-lg">
                Your data is protected with industry-leading security measures for worry-free ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Popular Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/menu?category=Pizza" className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
                  alt="Pizza"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-gray-900">Pizza</h3>
                  <p className="text-gray-600 mt-2">Authentic Italian flavors</p>
                </div>
              </div>
            </Link>

            <Link href="/menu?category=Indian" className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop"
                  alt="Indian"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-gray-900">Indian</h3>
                  <p className="text-gray-600 mt-2">Spicy & aromatic dishes</p>
                </div>
              </div>
            </Link>

            <Link href="/menu?category=Chinese" className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop"
                  alt="Chinese"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-gray-900">Chinese</h3>
                  <p className="text-gray-600 mt-2">Traditional Asian cuisine</p>
                </div>
              </div>
            </Link>

            <Link href="/menu?category=Desserts" className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
                  alt="Desserts"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-gray-900">Desserts</h3>
                  <p className="text-gray-600 mt-2">Sweet treats & delights</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-xl">
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "The food arrived hot and fresh. The delivery was faster than expected. Will definitely order again!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">Rahul M.</p>
                  <p className="text-gray-600">Mumbai</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "Great variety of restaurants to choose from. The app is easy to use and the delivery is always on
                time."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">Priya S.</p>
                  <p className="text-gray-600">Delhi</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "The customer service is excellent. Had an issue with my order and they resolved it immediately."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">Amit K.</p>
                  <p className="text-gray-600">Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&opacity=0.2')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Order Delicious Food?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Join thousands of satisfied customers who enjoy their favorite meals delivered right to their doorstep.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
              >
                Order Now
              </Button>
            </Link>
            <Link href="/membership">
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Join Membership
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                FoodieExpress
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                Delivering delicious food from your favorite restaurants right to your doorstep.
              </p>

              {/* Social Media Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/shaurya_verma03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/shauryaverma03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 hover:scale-110 transition-all"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shaurya47/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 p-3 rounded-full hover:bg-blue-500 hover:scale-110 transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://foodieexpress.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 p-3 rounded-full hover:bg-green-500 hover:scale-110 transition-all"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="text-gray-400 hover:text-white transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-gray-400 hover:text-white transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
              <address className="text-gray-400 not-italic space-y-2">
                <p>1234 Food Street</p>
                <p>Surat, Gujarat 395007</p>
                <p className="mt-4">Email: support@foodieexpress.com</p>
                <p>Phone: +91 95580 09929</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FoodieExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
