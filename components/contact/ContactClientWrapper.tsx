"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ContactForm from "./ContactForm"; // Corrected to default import

const ContactClientWrapper = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSuccess = () => {
    setFormSubmitted(true);
  };

  return (
    <>
      {formSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out. Our team will contact you within 24
            hours.
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="btn-primary"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <ContactForm onSuccess={handleSuccess} />
      )}
    </>
  );
};

export default ContactClientWrapper;
