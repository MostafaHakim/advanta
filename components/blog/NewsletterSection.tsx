"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    // Reset after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Subscribe to Newsletter</h3>
          <p className="text-sm text-gray-600">Get latest marketing insights</p>
        </div>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <p className="font-medium text-gray-900">
            Thank you for subscribing!
          </p>
          <p className="text-sm text-gray-600">
            Check your email for confirmation.
          </p>
        </motion.div>
      ) : (
        <>
          <p className="text-gray-600 mb-4 text-sm">
            Join 10,000+ marketers who receive our weekly newsletter with expert
            tips and industry insights.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </>
      )}
    </motion.div>
  );
};

export default NewsletterSection;
