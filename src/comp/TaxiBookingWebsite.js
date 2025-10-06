import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import logo from "../assets/logo1.png";
import { Car, Clock, Calculator } from "lucide-react";

const TaxiBookingWebsite = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicleType, setVehicleType] = useState("standard");
  const [distance, setDistance] = useState(5);
  const [duration, setDuration] = useState(1);
  const [fare, setFare] = useState(0);

  // Fare calculation rates
  const fareRates = {
    standard: { base: 3.5, perKm: 1.5, perMin: 0.3 },
    premium: { base: 5.0, perKm: 2.0, perMin: 0.4 },
    suv: { base: 6.0, perKm: 2.5, perMin: 0.5 },
  };

  // Calculate fare whenever inputs change
  useEffect(() => {
    const rate = fareRates[vehicleType];
    const calculatedFare =
      rate.base + distance * rate.perKm + duration * rate.perMin;
    setFare(parseFloat(calculatedFare.toFixed(2)));
  }, [distance, duration, vehicleType]);

  // Handle form submission (EmailJS)
  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      phone,
      pickup,
      destination,
      date,
      time,
      vehicleType,
      distance,
      duration,
      fare,
    };

    emailjs
      .send(
        "service_e285k2d", // replace with your EmailJS service ID
        "template_anyonkh", // replace with your EmailJS template ID
        templateParams,
        "OggzGRnI0rrjIwZok" // replace with your public key
      )
      .then(
        () => {
          alert("✅ YOUR BOOKING IS SUCCESSFUL!");
        },
        (error) => {
          console.error("❌ Error:", error.text);
          alert("YOUR BOOKING FAILED.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-[#F3B20E]">
      {/* Header */}
      <header className="text-black py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="logo" className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">BaviSham Taxi</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="www.google.com" className="hover:text-blue-600 transition">
              Home
            </a>
            <a href="www.google.com" className="hover:text-blue-600 transition">
              Services
            </a>
            <a href="www.google.com" className="hover:text-blue-600 transition">
              Pricing
            </a>
            <a href="www.google.com" className="hover:text-blue-600 transition">
              Contact
            </a>
          </nav>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
            Book Now
          </button>
        </div>
      </header>

      {/* Banner Image */}
      <section className="w-full h-48 md:h-64 overflow-hidden">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94b8ddab-fb5e-48f9-9c33-913f9d8fc9c8.png"
          alt="Taxi service banner"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Booking Form with Background */}
      <section
        className="container mx-auto px-4 py-12 mt-16 bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/1200/800')" }} // change to your bg image
      >
        <div className="bg-white/90 rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Book a Taxi</h3>

          <form onSubmit={sendEmail} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Pickup & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="flex gap-4">
                {["standard", "premium", "suv"].map((type) => (
                  <div
                    key={type}
                    className={`flex-1 text-center border rounded-lg py-6 cursor-pointer transition ${
                      vehicleType === type
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setVehicleType(type)}
                  >
                    <h4 className="font-medium capitalize">{type}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Distance & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (km)
                </label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (min)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Fare */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Fare:</span>
                <span>${fare.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
            >
              Book Now - ${fare.toFixed(2)}
            </button>
          </form>
        </div>
      </section>
       {/* Why Choose Us Section */}
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Why Choose Us
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    24/7 Availability
                  </h4>
                  <p className="text-gray-600">
                    Round-the-clock service for all your transportation needs
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Modern Fleet</h4>
                  <p className="text-gray-600">
                    Clean, comfortable vehicles maintained to highest standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    Transparent Pricing
                  </h4>
                  <p className="text-gray-600">
                    No hidden fees with upfront fare calculation
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Why Choose Us
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    24/7 Availability
                  </h4>
                  <p className="text-gray-600">
                    Round-the-clock service for all your transportation needs
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Modern Fleet</h4>
                  <p className="text-gray-600">
                    Clean, comfortable vehicles maintained to highest standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    Transparent Pricing
                  </h4>
                  <p className="text-gray-600">
                    No hidden fees with upfront fare calculation
                  </p>
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
                  <p className="text-gray-400">
                    Reliable transportation services since 2010
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-4">Services</h5>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Airport Transfers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        City Rides
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Corporate Travel
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Event Transportation
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-4">Support</h5>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Privacy Policy
                      </a>
                    </li>
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
