import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import logo from "../assets/logo1.png";
import { Car, Clock, MapPin, Calendar, Calculator } from "lucide-react";

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

  // Calculate fare dynamically
  useEffect(() => {
    const rate = fareRates[vehicleType as keyof typeof fareRates];
    const calculatedFare =
      rate.base + distance * rate.perKm + duration * rate.perMin;
    setFare(parseFloat(calculatedFare.toFixed(2)));
  }, [distance, duration, vehicleType]);

  // Handle form submission & email
  const sendEmail = (e: React.FormEvent) => {
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
        "service_e285k2d",
        "template_anyonkh",
        templateParams,
        "OggzGRnI0rrjIwZok"
      )
      .then(
        () => {
          alert(`✅ Taxi booked successfully! Your fare is $${fare.toFixed(2)}`);
        },
        (error) => {
          console.error("❌ Error:", error.text);
          alert("YOUR BOOKING FAILED. Please try again.");
        }
      );
  };

  return (
    <div style={{ backgroundColor: "#F3B20E" }} className="min-h-screen">
      {/* Header */}
      <header className="bg-yellow-500 text-black py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-300 rounded-full w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="logo" className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">BaviSham Taxi</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-200 transition">Home</a>
            <a href="#" className="hover:text-blue-200 transition">Services</a>
            <a href="#" className="hover:text-blue-200 transition">Pricing</a>
            <a href="#" className="hover:text-blue-200 transition">Contact</a>
          </nav>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
            Book Now
          </button>
        </div>
      </header>

      {/* Hero with background image */}
      <section
        className="relative py-16"
        style={{
          backgroundImage: `url("https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94b8ddab-fb5e-48f9-9c33-913f9d8fc9c8.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Pickup & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["standard", "premium", "suv"].map((type) => (
                  <div
                    key={type}
                    className={`border rounded-xl p-6 cursor-pointer transition-all text-center ${
                      vehicleType === type
                        ? "border-yellow-500 bg-yellow-100 scale-105"
                        : "border-gray-300 hover:border-yellow-400"
                    }`}
                    onClick={() => setVehicleType(type)}
                  >
                    <h4 className="text-lg font-semibold capitalize">{type}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Distance & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
                placeholder="Distance (km)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                placeholder="Duration (min)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Fare Calculation */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Fare Estimate
                </h4>
                <Calculator className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
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
    </div>
  );
};

export default TaxiBookingWebsite;
