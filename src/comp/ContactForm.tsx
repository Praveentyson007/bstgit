import React from "react";
import { sendForm } from "@emailjs/browser";

function ContactForm() {
  const sendEmail = (e) => {
    e.preventDefault();

    sendForm(
      "service_e285k2d",     // e.g., "service_xxxx"
      "template_4juoeph",    // e.g., "template_xxxx"
      e.target,
      "OggzGRnI0rrjIwZoks"      // e.g., "user_xxxxx"
    ).then(
      (result) => {
        console.log("Email sent successfully:", result.text);
        alert("Thank you! Your message was sent.");
        e.target.reset();  // Clear form after successful submission
      },
      (error) => {
        console.error("Email sending error:", error.text);
        alert("Oops! Failed to send your message. Please try again later.");
      }
    );
  };

  return (
    <form onSubmit={sendEmail}>
      <input type="text" name="user_name" placeholder="Your Name" required />
      <input type="email" name="user_email" placeholder="Your Email" required />
      <input type="pickuplocation" name="pickuplocation" placeholder="pickuplocation" required />
      <input type="date" name="date" placeholder="date" required />
      <input type="time" name="time" placeholder="time" required />
      <input type="destination" name="destination" placeholder="Your destination" required />
      <input type="text" name="user_phone" placeholder="Your Phone Number" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
