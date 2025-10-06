import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import logo from "../assets/logo1.png";
import { Car, Clock, MapPin, Calendar, Calculator, Phone ,Menu,X} from "lucide-react";

const fareRates = {
  standard: {
    base: 14,
    perKm: 14,
    perMin: 0.3,
  },
  premium: {
    base: 17,
    perKm: 17,
    perMin: 0.4,
  },
  suv: {
    base: 21,
    perKm: 21,
    perMin: 0.5,
  },
};



const TaxiBookingWebsite = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicleType, setVehicleType] = useState("standard");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fare, setFare] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const currencySymbol = "\u20B9";






  // Calculate fare whenever inputs change
  useEffect(() => {
    const rate = fareRates[vehicleType];
    if (!rate) {
      setFare(0);
      return;
    }
    const calculatedFare = rate.base + distance * rate.perKm + duration * rate.perMin;
    setFare(parseFloat(calculatedFare.toFixed(2)));
  }, [distance, duration, vehicleType]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_e285k2d", // replace with your EmailJS Service ID
        "template_anyonkh", // replace with your EmailJS Template ID
        {
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
        },
        "OggzGRnI0rrjIwZok" // replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          alert("Your Booking has confirmed ✅");
          console.log(result.text);
        },
        (error) => {
          alert("Failed ❌ " + error.text);
        }
      );
    e.target.reset();
    // Reset controlled form states
    setName("");
    setPhone("");
    setPickup("");
    setDestination("");
    setDate("");
    setTime("");
    setDistance(0);
    setDuration(0);
    setFare(0);
  };

  return (
    <div style={{ backgroundColor: "#F3B20E" }} className="min-h-screen">
      {/* Header */}
 <header className="bg-[#F3B20E] text-black py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#F3B20E] rounded-full w-12 h-12 flex items-center justify-center">
            <img src={logo} alt="logo" className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">BaviSham Taxi</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 text-black font-bold ">
          <button className=" hover:text-white transition">Home</button>
          <button className="hover:text-white transition">Services</button>
          <button className="hover:text-white transition">Pricing</button>
          <button className="hover:text-white transition">Contact</button>
        </nav>

        {/* Book Now Button (hidden on small screens) */}
        <div className="hidden md:block">
          <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F3B20E] text-black px-4 pt-4 pb-6 space-y-4">
          <button className="block w-full text-left hover:text-white transition">
            Home
          </button>
          <button className="block w-full text-left hover:text-white transition">
            Services
          </button>
          <button className="block w-full text-left hover:text-white transition">
            Pricing
          </button>
          <button className="block w-full text-left hover:text-white transition">
            Contact
          </button>

          <button className="w-full bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Book Now
          </button>
        </div>
      )}
    </header>

      {/* Add padding-top so page content isn't hidden */}
      



      {/* Banner Image */}
      <section className="w-full h-48 md:h-64 overflow-hidden">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94b8ddab-fb5e-48f9-9c33-913f9d8fc9c8.png"
          alt="Taxi service banner showing modern taxi fleet on city streets"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Hero Section */}
      <section style={{ backgroundColor: "#F3B20E" }} className="text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Book Your Ride in Seconds</h2>
          <p className="text-xl mb-8">Fast, reliable taxi service at your fingertips</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 -mt-16">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Book a Taxi</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pickup & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup */}
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
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {
                    id: "standard",
                    label: "Standard",
                    price: currencySymbol + " " + fareRates.standard.perKm,
                  },
                  {
                    id: "premium",
                    label: "Premium",
                    price: currencySymbol + " " + fareRates.premium.perKm,
                  },
                  {
                    id: "suv",
                    label: "SUV",
                    price: currencySymbol + " " + fareRates.suv.perKm,
                  },
                ].map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${vehicleType === vehicle.id
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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (km)
                </label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  <span>
                    {currencySymbol}{" "}{fareRates[vehicleType].base.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Distance ({distance} km × {currencySymbol}{" "}
                    {fareRates[vehicleType].perKm}/km):
                  </span>

                  <span>{currencySymbol}{" "}{(distance * fareRates[vehicleType].perKm).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Time ({duration} min × {currencySymbol}{" "}
                    {fareRates[vehicleType].perMin}/min):
                  </span>
                  <span>{currencySymbol}{" "}{(duration * fareRates[vehicleType].perMin).toFixed(2)}</span>
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
              Book Now - {currencySymbol}{" "}{fare.toFixed(2)}
            </button>
          </form>
        </div>
      </section>

      {/* Car Showcase Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Modern Fleet</h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience comfort and reliability with our well-maintained vehicles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Standard Sedan */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94b24a05-2424-4108-8973-e102f1b68cce.png"
                alt="Modern silver sedan taxi with clean lines and comfortable interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">Standard Sedan</h4>
              <p className="text-gray-600 mb-4 text-center">Comfortable and efficient for everyday travel for your needs</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">{currencySymbol + " 25"}</span>
                <span className="text-sm text-gray-500">4 passengers</span>
              </div>
            </div>
          </div>

          {/* Premium Luxury */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/366668b3-f923-4894-8f73-a3b17e54435d.png"
                alt="Luxury black executive car with leather interior and premium features"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">Premium Luxury</h4>
              <p className="text-gray-600 mb-4 text-center">
                Executive comfort for business or special occasions
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">{currencySymbol + " 25"}</span>
                <span className="text-sm text-gray-500">4 passengers</span>
              </div>
            </div>
          </div>

          {/* SUV */}
          {/* SUV */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6c6c5d5b-8cb2-433f-90e7-51f465b127ef.png"
                alt="Spacious black SUV with ample luggage space and comfortable seating"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">SUV</h4>
              <p className="text-gray-600 mb-4 text-center">
                Perfect for groups and airport transfers with luggage
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">{currencySymbol + " 25"}</span>
                <span className="text-sm text-gray-500">6 passengers</span>
              </div>
            </div>
          </div>

          {/* Electric Vehicle */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/40cfac20-9130-404c-8d82-524b284d1708.png"
                alt="Modern white electric vehicle with eco-friendly design and silent operation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">Electric Vehicle</h4>
              <p className="text-gray-600 mb-4 text-center">Eco-friendly travel with zero emissions</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">{currencySymbol + " 25"}</span>
                <span className="text-sm text-gray-500">4 passengers</span>
              </div>
            </div>
          </div>

          {/* Minivan */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/48a4816b-1ff8-43cb-be14-a199b871183a.png"
                alt="Spacious minivan with sliding doors and comfortable seating for large groups"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">Minivan</h4>
              <p className="text-gray-600 mb-4 text-center">Ideal for large families and group travel</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">{currencySymbol + " 25"}</span>
                <span className="text-sm text-gray-500">8 passengers</span>
              </div>
            </div>
          </div>

          {/* Luxury Van */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/73aaa223-180b-42ef-af12-1f77eb4fbf95.png"
                alt="Premium luxury van with executive seating and entertainment system"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">Luxury Van</h4>
              <p className="text-gray-600 mb-4 text-center">
                Ultimate comfort for corporate events and weddings
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">{currencySymbol + " 25"}</span>
                <span className="text-sm text-gray-500">6 passengers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ----------------------------------------------------------------------------------------------------------- */}

















































      {/* ----------------------------------------------------------------------------------------------------------- */}
      {/* Features Section */}
      <section style={{ backgroundColor: "#F3B20E" }} className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">24/7 Availability</h4>
              <p className="text-black-600">Round-the-clock service for all your transportation needs</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Modern Fleet</h4>
              <p className="text-black-600">Clean, comfortable vehicles maintained to highest standards</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Transparent Pricing</h4>
              <p className="text-black-600">No hidden fees with upfront fare calculation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#F3B20E" }} className="text-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-gray-600" />
                <h4 className="text-xl font-bold">BaviSham Taxi</h4>
              </div>
              <p className="text-black-600">Reliable transportation services since 2010</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-black">
                <li>

                  Airport Transfers

                </li>
                <li>

                  City Rides

                </li>
                <li>

                  Corporate Travel

                </li>
                <li>

                  Event Transportation

                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-black">
                <li>

                  Help Center

                </li>
                <li>

                  Contact Us

                </li>
                <li>
                  FAQs
                </li>
                <li>

                  Privacy Policy

                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-black-600">
                <li>123 Taxi Street</li>
                <li>City, State 12345</li>
                <li>+1 (555) 123-4567</li>
                <li>info@BaviShamtaxi.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-black-600">
            <p>© 2023 BaviSham Taxi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaxiBookingWebsite;

