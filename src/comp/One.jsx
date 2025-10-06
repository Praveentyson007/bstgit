import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import logo from "../assets/logo1.png";
import {  Clock, MapPin, Calendar, Calculator } from "lucide-react";

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

  const fareRates = {
    standard: { base: 3.5, perKm: 1.5, perMin: 0.3 },
    premium: { base: 5.0, perKm: 2.0, perMin: 0.4 },
    suv: { base: 6.0, perKm: 2.5, perMin: 0.5 },
  };

  useEffect(() => {
    const rate = fareRates[vehicleType];
    const calculatedFare =
      rate.base + distance * rate.perKm + duration * rate.perMin;
    setFare(parseFloat(calculatedFare.toFixed(2)));
  }, [distance, duration, fareRates, vehicleType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_e285k2d",
        "template_4juoeph",
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
        "OggzGRnI0rrjIwZok"
      )
      .then(
        (result) => {
          alert("Email sent ✅");
          console.log(result.text);
        },
        (error) => {
          alert("Failed ❌ " + error.text);
        }
      );

    // Reset form
    setName("");
    setPhone("");
    setPickup("");
    setDestination("");
    setDate("");
    setTime("");
    setVehicleType("standard");
    setDistance(0);
    setDuration(0);
    setFare(0);
  };

  return (
    <div className="min-h-screen bg-yellow-500">
      {/* Header */}
      <header className="bg-yellow-500 text-black py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="logo" className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">BaviSham Taxi</h1>
          </div>

          {/* <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-200 transition">Home</a>
            <a href="#" className="hover:text-blue-200 transition">Services</a>
            <a href="#" className="hover:text-blue-200 transition">Pricing</a>
            <a href="#" className="hover:text-blue-200 transition">Contact</a>
          </nav> */}

          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
            Book Now
          </button>
        </div>
      </header>

      {/* Banner */}
      <section className="w-full h-48 md:h-64 overflow-hidden">
        <img
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94b8ddab-fb5e-48f9-9c33-913f9d8fc9c8.png"
          alt="Taxi service banner"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Hero */}
      <section className="text-black py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Book Your Ride in Seconds</h2>
          <p className="text-xl mb-8">Fast, reliable taxi service at your fingertips</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 py-12 -mt-16">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Book a Taxi</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pickup & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
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

            {/* Distance & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Fare */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Fare Estimate</h4>
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base fare:</span>
                  <span>${fareRates[vehicleType].base.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance ({distance} km × ${fareRates[vehicleType].perKm} /km):</span>
                  <span>${(distance * fareRates[vehicleType].perKm).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time ({duration} min × ${fareRates[vehicleType].perMin} /min):</span>
                  <span>${(duration * fareRates[vehicleType].perMin).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${fare.toFixed(2)}</span>
                </div>
              </div>
            </div>

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
