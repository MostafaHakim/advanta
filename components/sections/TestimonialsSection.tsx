// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     position: "CEO, TechStart Inc.",
//     company: "TechStart Inc.",
//     content:
//       "NextMarketing transformed our online presence completely. Our organic traffic increased by 300% within 6 months. Their team is professional, responsive, and truly understands digital marketing.",
//     rating: 5,
//     image: "/api/placeholder/100/100",
//     results: [
//       { metric: "Traffic Growth", value: "300%" },
//       { metric: "Lead Generation", value: "+150%" },
//       { metric: "ROI", value: "5x" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     position: "Marketing Director, GlobalRetail",
//     company: "GlobalRetail",
//     content:
//       "The PPC campaigns managed by NextMarketing have been exceptional. They reduced our cost per acquisition by 40% while increasing conversions. Highly recommended!",
//     rating: 5,
//     image: "/api/placeholder/100/100",
//     results: [
//       { metric: "Cost Reduction", value: "-40%" },
//       { metric: "Conversions", value: "+200%" },
//       { metric: "ROAS", value: "8x" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Emma Rodriguez",
//     position: "Founder, GreenLife Organics",
//     company: "GreenLife Organics",
//     content:
//       "Their social media strategy helped us build an engaged community of 50K+ followers. The content quality and engagement rates are outstanding.",
//     rating: 5,
//     image: "/api/placeholder/100/100",
//     results: [
//       { metric: "Followers Growth", value: "+50K" },
//       { metric: "Engagement Rate", value: "8.5%" },
//       { metric: "Website Clicks", value: "+300%" },
//     ],
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     position: "E-commerce Manager, FashionHub",
//     company: "FashionHub",
//     content:
//       "The web development team built us a stunning e-commerce platform that loads in under 2 seconds. Our conversion rate improved by 35% immediately after launch.",
//     rating: 5,
//     image: "/api/placeholder/100/100",
//     results: [
//       { metric: "Conversion Rate", value: "+35%" },
//       { metric: "Page Speed", value: "1.8s" },
//       { metric: "Mobile Traffic", value: "+60%" },
//     ],
//   },
//   {
//     id: 5,
//     name: "Lisa Anderson",
//     position: "CMO, HealthPlus",
//     company: "HealthPlus",
//     content:
//       "Content marketing strategy by NextMarketing has positioned us as industry thought leaders. We now generate 500+ qualified leads monthly through content alone.",
//     rating: 5,
//     image: "/api/placeholder/100/100",
//     results: [
//       { metric: "Monthly Leads", value: "500+" },
//       { metric: "Domain Authority", value: "65" },
//       { metric: "Backlinks", value: "+2000" },
//     ],
//   },
// ];

// const TestimonialsSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const nextTestimonial = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setDirection(-1);
//     setCurrentIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   const goToTestimonial = (index: number) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   const currentTestimonial = testimonials[currentIndex];

//   return (
//     <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
//       <div className="container-custom">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
//             <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
//             <span className="text-sm font-medium">Client Testimonials</span>
//           </div>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//             What Our <span className="text-blue-600">Clients Say</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Don't just take our word for it. Here's what our satisfied clients
//             have to say about working with us.
//           </p>
//         </motion.div>

//         {/* Main Testimonial Carousel */}
//         <div className="max-w-6xl mx-auto mb-12">
//           <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12">
//             <Quote className="w-12 h-12 text-blue-100 absolute top-8 left-8" />

//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={currentTestimonial.id}
//                 custom={direction}
//                 initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
//                 transition={{ duration: 0.4 }}
//                 className="grid lg:grid-cols-2 gap-8"
//               >
//                 {/* Testimonial Content */}
//                 <div>
//                   <div className="flex items-center mb-6">
//                     <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 mr-4">
//                       <Image
//                         src={currentTestimonial.image}
//                         alt={currentTestimonial.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold">
//                         {currentTestimonial.name}
//                       </h3>
//                       <p className="text-gray-600">
//                         {currentTestimonial.position}
//                       </p>
//                       <div className="flex items-center mt-1">
//                         {[...Array(currentTestimonial.rating)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className="w-4 h-4 text-yellow-400 fill-current"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <blockquote className="text-lg text-gray-700 mb-6 italic">
//                     "{currentTestimonial.content}"
//                   </blockquote>

//                   {/* Results */}
//                   <div className="grid grid-cols-3 gap-4 mt-8">
//                     {currentTestimonial.results.map((result, index) => (
//                       <div
//                         key={index}
//                         className="text-center p-4 bg-blue-50 rounded-xl"
//                       >
//                         <div className="text-2xl font-bold text-blue-600">
//                           {result.value}
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           {result.metric}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Company Logo/Decoration */}
//                 <div className="flex items-center justify-center">
//                   <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
//                     <div className="text-center">
//                       <div className="text-6xl font-bold text-blue-100 mb-4">
//                         {currentTestimonial.company.charAt(0)}
//                       </div>
//                       <div className="text-2xl font-bold text-gray-800">
//                         {currentTestimonial.company}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Buttons */}
//             <div className="flex justify-between items-center mt-8">
//               <button
//                 onClick={prevTestimonial}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>

//               <div className="flex gap-2">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToTestimonial(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex
//                         ? "bg-blue-600 w-8"
//                         : "bg-gray-300 hover:bg-gray-400"
//                     }`}
//                   />
//                 ))}
//               </div>

//               <button
//                 onClick={nextTestimonial}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Additional Testimonials Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {testimonials.slice(0, 3).map((testimonial, index) => (
//             <motion.div
//               key={testimonial.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="flex items-center mb-4">
//                 <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 mr-3">
//                   <Image
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="font-bold">{testimonial.name}</h4>
//                   <p className="text-sm text-gray-600">{testimonial.company}</p>
//                 </div>
//               </div>

//               <div className="flex mb-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className="w-4 h-4 text-yellow-400 fill-current"
//                   />
//                 ))}
//               </div>

//               <p className="text-gray-700 text-sm line-clamp-3">
//                 "{testimonial.content}"
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mt-12"
//         >
//           <p className="text-gray-600 mb-4">
//             Ready to join our satisfied clients?
//           </p>
//           <button className="btn-primary">Start Your Success Story</button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    content:
      "NextMarketing transformed our online presence completely. Our organic traffic increased by 300% within 6 months. Their team is professional, responsive, and truly understands digital marketing.",
    rating: 5,
    image: "/api/placeholder/100/100",
    results: [
      { metric: "Traffic Growth", value: "300%" },
      { metric: "Lead Generation", value: "+150%" },
      { metric: "ROI", value: "5x" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Marketing Director, GlobalRetail",
    company: "GlobalRetail",
    content:
      "The PPC campaigns managed by NextMarketing have been exceptional. They reduced our cost per acquisition by 40% while increasing conversions. Highly recommended!",
    rating: 5,
    image: "/api/placeholder/100/100",
    results: [
      { metric: "Cost Reduction", value: "-40%" },
      { metric: "Conversions", value: "+200%" },
      { metric: "ROAS", value: "8x" },
    ],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Founder, GreenLife Organics",
    company: "GreenLife Organics",
    content:
      "Their social media strategy helped us build an engaged community of 50K+ followers. The content quality and engagement rates are outstanding.",
    rating: 5,
    image: "/api/placeholder/100/100",
    results: [
      { metric: "Followers Growth", value: "+50K" },
      { metric: "Engagement Rate", value: "8.5%" },
      { metric: "Website Clicks", value: "+300%" },
    ],
  },
  {
    id: 4,
    name: "David Wilson",
    position: "E-commerce Manager, FashionHub",
    company: "FashionHub",
    content:
      "The web development team built us a stunning e-commerce platform that loads in under 2 seconds. Our conversion rate improved by 35% immediately after launch.",
    rating: 5,
    image: "/api/placeholder/100/100",
    results: [
      { metric: "Conversion Rate", value: "+35%" },
      { metric: "Page Speed", value: "1.8s" },
      { metric: "Mobile Traffic", value: "+60%" },
    ],
  },
  {
    id: 5,
    name: "Lisa Anderson",
    position: "CMO, HealthPlus",
    company: "HealthPlus",
    content:
      "Content marketing strategy by NextMarketing has positioned us as industry thought leaders. We now generate 500+ qualified leads monthly through content alone.",
    rating: 5,
    image: "/api/placeholder/100/100",
    results: [
      { metric: "Monthly Leads", value: "500+" },
      { metric: "Domain Authority", value: "65" },
      { metric: "Backlinks", value: "+2000" },
    ],
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Deep Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]" />

      {/* Glow */}
      <div className="absolute top-32 left-24 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-32 right-24 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            <span className="text-sm font-medium">Client Testimonials</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about working with us.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-blue-500/20 absolute top-8 left-8" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 120 : -120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
                transition={{ duration: 0.45 }}
                className="grid lg:grid-cols-2 gap-10"
              >
                {/* Content */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 mr-4">
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-400">
                        {currentTestimonial.position}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-lg text-gray-300 italic mb-8">
                    “{currentTestimonial.content}”
                  </blockquote>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4">
                    {currentTestimonial.results.map((result, i) => (
                      <div
                        key={i}
                        className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="text-2xl font-bold text-blue-400">
                          {result.value}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Card */}
                <div className="flex items-center justify-center">
                  <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-extrabold text-white/20 mb-4">
                        {currentTestimonial.company.charAt(0)}
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {currentTestimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-blue-500 w-8"
                        : "bg-white/30 w-3 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 mr-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-300 text-sm line-clamp-3">
                “{testimonial.content}”
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            Ready to join our satisfied clients?
          </p>
          <button className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition shadow-lg">
            Start Your Success Story
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
