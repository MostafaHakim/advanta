"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Users,
  Headphones,
  Building,
} from "lucide-react";
import { ContactForm } from "@/components/contact";
import Link from "next/link";

export default function ContactPage() {
  type ContactInfo = {
    icon: IconName;
    title: string;
    details: string[];
    description?: string;
  };

  type Department = {
    icon: IconName;
    name: string;
    email: string;
  };

  type AddressDetail = {
    title: string;
    details: string[];
  };

  type AddressItem = {
    address?: AddressDetail;
    visitHours?: AddressDetail;
    Appointment?: AddressDetail;
  };

  type ContactSettingsType = {
    data: {
      contactInfo: ContactInfo[];
      departments: Department[];
      address?: AddressItem[];
    };
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactSetting, setContactSettings] =
    useState<ContactSettingsType | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((res) => setContactSettings(res));
  }, []);

  type IconName =
    | "Phone"
    | "Mail"
    | "MapPin"
    | "Clock"
    | "MessageSquare"
    | "CheckCircle"
    | "Users"
    | "Headphones"
    | "Building";

  const getIconComponent = (iconName: IconName) => {
    const iconMap: Record<IconName, JSX.Element> = {
      Phone: <Phone className="w-6 h-6" />,
      Mail: <Mail className="w-6 h-6" />,
      MapPin: <MapPin className="w-6 h-6" />,
      Clock: <Clock className="w-6 h-6" />,
      MessageSquare: <MessageSquare className="w-6 h-6" />,
      CheckCircle: <CheckCircle className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />,
      Headphones: <Headphones className="w-6 h-6" />,
      Building: <Building className="w-6 h-6" />,
    };
    return iconMap[iconName] || null;
  };

  return (
    <>
      {/* Hero Section */}
      <section className=" pt-20 lg:pt-32 lg:pb-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 lg:mb-6">
              Let&apos;s <span className="text-blue-600">Connect</span>
            </h1>
            <p className="text-md lg:text-xl text-gray-600 mb-2 lg:mb-8">
              Ready to transform your digital presence? Get in touch with our
              team for a free consultation and discover how we can help your
              business grow.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-4  bg-white">
        <div className="container-custom">
          <div className=" grid lg:grid-cols-2 gap-4 lg:gap-8">
            {/* Contact Form */}
            <div className="col-span-1 ">
              <h2 className="text-xl lg:text-3xl font-bold ">
                Send us a Message
              </h2>

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
            <div className="space-y-8 col-span-1 w-11/12 lg:w-full">
              {/* Departments */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <h3 className="text-lg lg:text-2xl font-bold mb-6">
                  Contact by Department
                </h3>
                {contactSetting ? (
                  <div className="space-y-4">
                    {contactSetting?.data?.departments?.map((dept, index) => (
                      <motion.div
                        key={dept.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center p-4 bg-white rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                          {getIconComponent(dept.icon)}
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
                ) : (
                  <div className="flex items-center p-4 bg-white rounded-xl">
                    <ClipLoader />
                  </div>
                )}
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-lg">
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
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-4 lg:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12">
            <h2 className="text-xl lg:text-3xl font-bold  lg:mb-6 text-center lg:text-left">
              Visit Our Office
            </h2>

            <div className="grid md:grid-cols-2 gap-4 lg:gap-8 mb-4 lg:mb-20">
              {contactSetting?.data?.contactInfo?.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center lg:p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6">
                    {getIconComponent(info.icon)}
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
            <Link
              href="https://calendly.com/advantascale/30min"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
