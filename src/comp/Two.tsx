import { useState, useEffect } from "react";
import React from "react";
import { Car, Clock, MapPin, Calendar, Calculator } from "lucide-react";

const TaxiBookingWebsite = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicleType, setVehicleType] = useState("standard");
  const [distance, setDistance] = useState(5);
  const [duration, setDuration] = useState(15);
  const [fare, setFare] = useState(0);

  // Fare calculation rates
  const fareRates = {
    standard: { base: 3.5, perKm: 1.5, perMin: 0.3 },
    premium: { base: 5.0, perKm: 2.0, perMin: 0.4 },
    suv: { base: 6.0, perKm: 2.5, perMin: 0.5 },
  };

  // Calculate fare whenever inputs change
  useEffect(() => {
    const rate = fareRates[vehicleType as keyof typeof fareRates];
    const calculatedFare = rate.base + (distance * rate.perKm) + (duration * rate.perMin);
    setFare(parseFloat(calculatedFare.toFixed(2)));
  }, [distance, duration, vehicleType]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Taxi booked successfully! Your fare is $${fare.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8" />
              <h1 className="text-2xl font-bold">BaviSham Taxi</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/google.com" className="hover:text-blue-200 transition">Home</a>
              <a href="/google.com" className="hover:text-blue-200 transition">Services</a>
              <a href="/google.com" className="hover:text-blue-200 transition">Pricing</a>
              <a href="/google.com" className="hover:text-blue-200 transition">Contact</a>
            </nav>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-yellow-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Book Your Ride in Seconds</h2>
          <p className="text-xl mb-8">Fast, reliable taxi service at your fingertips</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 py-12 -mt-16">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Book a Taxi</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup location"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "standard", label: "Standard", price: "$$" },
                  { id: "premium", label: "Premium", price: "$$$" },
                  { id: "suv", label: "SUV", price: "$$$$" },
                ].map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      vehicleType === vehicle.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                    onClick={() => setVehicleType(vehicle.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{vehicle.label}</h4>
                        <p className="text-sm text-gray-600">{vehicle.price}</p>
                      </div>
                      {vehicleType === vehicle.id && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distance and Duration Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance: {distance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 km</span>
                  <span>50 km</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration: {duration} min
                </label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            {/* Fare Calculation */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Fare Estimate</h4>
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base fare:</span>
                  <span>${fareRates[vehicleType as keyof typeof fareRates].base.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance ({distance} km × ${fareRates[vehicleType as keyof typeof fareRates].perKm}/km):</span>
                  <span>${(distance * fareRates[vehicleType as keyof typeof fareRates].perKm).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time ({duration} min × ${fareRates[vehicleType as keyof typeof fareRates].perMin}/min):</span>
                  <span>${(duration * fareRates[vehicleType as keyof typeof fareRates].perMin).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${fare.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
            >
              Book Now - ${fare.toFixed(2)}
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Coverage Area</h3>
            <p className="text-gray-600 mb-6">
              We serve the entire city and surrounding areas with reliable taxi service.
            </p>
          </div>
          <div className="w-full h-64 md:h-96 bg-gray-200 relative">
            <img 
              src="https://placehold.co/800x400" 
              alt="Map showing taxi service coverage area with highlighted routes and service boundaries" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">24/7 Availability</h4>
              <p className="text-gray-600">Round-the-clock service for all your transportation needs</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Modern Fleet</h4>
              <p className="text-gray-600">Clean, comfortable vehicles maintained to highest standards</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Transparent Pricing</h4>
              <p className="text-gray-600">No hidden fees with upfront fare calculation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-blue-400" />
                <h4 className="text-xl font-bold">BaviShamt Taxi</h4>
              </div>
              <p className="text-gray-400">Reliable transportation services since 2010</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Airport Transfers</a></li>
                <li><a href="#" className="hover:text-white transition">City Rides</a></li>
                <li><a href="#" className="hover:text-white transition">Corporate Travel</a></li>
                <li><a href="#" className="hover:text-white transition">Event Transportation</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>123 Taxi Street</li>
                <li>City, State 12345</li>
                <li>+1 (555) 123-4567</li>
                <li>info@BaviShamtaxi.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 BaviSham Taxi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaxiBookingWebsite;