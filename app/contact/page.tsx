"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Users,
  Headphones,
} from "lucide-react";
import { ContactForm } from "@/components/contact";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+8801722440899", "+8801761933911"],
      description: "Mon-Fri, 9am-6pm EST",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["support@advantascale.com", "contact@advantascale.com"],
      description: "Response within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      details: ["Bonani Dhaka", "Dhaka-1212 Banhladesh "],
      description: "Visit us anytime",
    },
  ];

  const departments = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      name: "Sales & Partnerships",
      email: "sales@advantascale.com",
    },
    {
      icon: <Users className="w-5 h-5" />,
      name: "Client Support",
      email: "support@advantascale.com",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      name: "Technical Support",
      email: "tech@advantascale.com",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s <span className="text-blue-600">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to transform your digital presence? Get in touch with our
              team for a free consultation and discover how we can help your
              business grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary">Schedule a Call</button>
              <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

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
                    Thank you for reaching out. Our team will contact you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <ContactForm onSuccess={() => setFormSubmitted(true)} />
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Departments */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Contact by Department
                </h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center p-4 bg-white rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                        {dept.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{dept.name}</h4>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
                    { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
                    { day: "Sunday", hours: "Emergency Support Only" },
                  ].map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-blue-600">
                    <span className="font-bold">Emergency Support:</span>{" "}
                    Available 24/7 for existing clients
                  </p>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
                <p className="mb-6 opacity-90">
                  Check our FAQ section for quick answers to common questions.
                </p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Visit FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
              <p className="text-gray-600 mb-8">
                Located in the heart of San Francisco&apos;s tech district, our
                office is designed for collaboration and innovation. Come visit
                us to discuss your project in person.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Address</h4>
                    <p className="text-gray-600">
                      123 Marketing Street
                      <br />
                      San Francisco, CA 94107
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Visiting Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 6pm
                      <br />
                      By appointment only
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Appointment</h4>
                    <p className="text-gray-600">
                      Call ahead to schedule your visit:
                      <br />
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-8 btn-primary">Get Directions</button>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl h-[400px] flex items-center justify-center text-white">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
                <p>Google Maps Integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Digital Transformation Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join hundreds of satisfied clients who have transformed their
            businesses with our expertise
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Book Free Consultation
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
