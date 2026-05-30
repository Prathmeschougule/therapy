import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  Heart,
  Brain,
  TrendingUp,
  Shield,
  Users,
  Calendar,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { SuccessModal } from "./components/SuccessModal";
import { LoadingSpinner } from "./components/LoadingSpinner";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    anxietyLevel: 3,
    overthinkingLevel: 3,
    sessionPreference: "1:1-online",
    availability: "",
    email: "",
    phone: "",
    budget: "500-800",
    consent: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsLoading(true);
  setSubmitError("");

  try {
    await emailjs.send(
      "service_mdidysi",   // 🔴 yaha apna service id daalo
      "template_2b4pr3d",  // 🔴 yaha apna template id daalo
      {
        name: formData.name,
        age: formData.age,
        anxiety_level: formData.anxietyLevel,
        overthinking_level: formData.overthinkingLevel,
        session_preference: formData.sessionPreference,
        availability: formData.availability,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        message: "New Counseling Request",
        time: new Date().toLocaleString()
      },
      "9Tj1EmY2Z0itFv1_K" // ✅ tumhari public key
    );

    console.log("Email sent successfully");

    setShowSuccessModal(true);

    // optional: form reset
    setFormData({
      name: "",
      age: "",
      anxietyLevel: 3,
      overthinkingLevel: 3,
      sessionPreference: "1:1-online",
      availability: "",
      email: "",
      phone: "",
      budget: "500-800",
      consent: false
    });

  } catch (error) {
    console.error("Email failed:", error);
    const emailError = error as { status?: number; text?: string };
    const needsReconnect =
      emailError.status === 412 ||
      emailError.text?.toLowerCase().includes("invalid grant");

    setSubmitError(
      needsReconnect
        ? "Message could not be sent because the Gmail account connected to EmailJS needs to be reconnected. Please try again later."
        : "Something went wrong while sending your message. Please try again."
    );
  }

  setIsLoading(false);
};

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Reset form
    setFormData({
      name: "",
      age: "",
      anxietyLevel: 3,
      overthinkingLevel: 3,
      sessionPreference: "1:1-online",
      availability: "",
      email: "",
      phone: "",
      budget: "500-800",
      consent: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ff] via-white to-[#faf5ff] font-['Poppins']">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-lavender-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100/40 to-pink-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl mb-6 text-gray-900 leading-tight">
                Support for Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  Emotional Well-being
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join 1:1 or group sessions focused on anxiety, overthinking, and
                personal growth.
              </p>
              <motion.a
                href="#form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1771555875961-532f2f6d4efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsJTIwd29tYW58ZW58MXx8fHwxNzc1NTg3MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Peaceful meditation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-gray-900">
              Personalized Care for Your Mental Health
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We offer personalized 1:1 sessions and supportive group therapy to
              help you manage anxiety, overthinking, and improve emotional
              well-being.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Anxiety Support",
                description:
                  "Practical techniques to manage and reduce anxiety in your daily life.",
                color: "from-rose-400 to-pink-500",
              },
              {
                icon: Brain,
                title: "Overthinking Help",
                description:
                  "Break free from thought patterns and find mental clarity.",
                color: "from-purple-400 to-indigo-500",
              },
              {
                icon: TrendingUp,
                title: "Emotional Growth",
                description:
                  "Build resilience and develop healthier coping mechanisms.",
                color: "from-violet-400 to-purple-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-purple-100/50">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-20 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-purple-200/30 to-pink-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-gray-900">
              Begin Your Healing Journey
            </h2>
            <p className="text-lg text-gray-600">
              Share a bit about yourself so we can personalize your experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl border border-purple-100/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Name and Age */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-sm md:text-base bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-sm md:text-base bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    placeholder="Your age"
                  />
                </div>
              </div>

              {/* Anxiety Level */}
              <div>
                <label className="block text-gray-700 mb-3 text-sm md:text-base">
                  Anxiety Level
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm text-gray-500 sm:min-w-[80px] w-full sm:w-auto text-center sm:text-left">
                    Not at all
                  </span>
                  <div className="flex-1 flex gap-2 sm:gap-3 justify-center w-full">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            anxietyLevel: level,
                          }))
                        }
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all ${
                          formData.anxietyLevel === level
                            ? "bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500 scale-110 shadow-lg"
                            : "bg-white border-purple-200 hover:border-purple-400"
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm ${
                            formData.anxietyLevel === level
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        >
                          {level}
                        </span>
                      </button>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 sm:min-w-[80px] w-full sm:w-auto text-center sm:text-right">
                    Too much
                  </span>
                </div>
              </div>

              {/* Overthinking Level */}
              <div>
                <label className="block text-gray-700 mb-3 text-sm md:text-base">
                  Overthinking Level
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm text-gray-500 sm:min-w-[80px] w-full sm:w-auto text-center sm:text-left">
                    Not at all
                  </span>
                  <div className="flex-1 flex gap-2 sm:gap-3 justify-center w-full">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            overthinkingLevel: level,
                          }))
                        }
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all ${
                          formData.overthinkingLevel === level
                            ? "bg-gradient-to-br from-indigo-500 to-purple-500 border-indigo-500 scale-110 shadow-lg"
                            : "bg-white border-purple-200 hover:border-purple-400"
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm ${
                            formData.overthinkingLevel === level
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        >
                          {level}
                        </span>
                      </button>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 sm:min-w-[80px] w-full sm:w-auto text-center sm:text-right">
                    Too much
                  </span>
                </div>
              </div>

              {/* Session Preference */}
              <div>
                <label className="block text-gray-700 mb-3 text-sm md:text-base">
                  Session Preference
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  {[
                    { value: "1:1-online", label: "1:1 Online" },
                    { value: "1:1-in-person", label: "1:1 In-Person" },
                    { value: "group-online", label: "Group Online" },
                    { value: "both", label: "Both" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sessionPreference: option.value,
                        }))
                      }
                      className={`px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base rounded-xl border-2 transition-all ${
                        formData.sessionPreference === option.value
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg"
                          : "bg-white border-purple-200 text-gray-700 hover:border-purple-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">
                  Availability
                </label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 text-sm md:text-base bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  placeholder="e.g., Sunday at 4 PM"
                />
              </div>

              {/* Contact Details */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-sm md:text-base bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-sm md:text-base bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-gray-700 mb-3 text-sm md:text-base">
                  Budget (per session)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                  {[
                    { value: "500-800", label: "₹500 - ₹800" },
                    { value: "800-1000", label: "₹800 - ₹1000" },
                    { value: "1000-1200", label: "₹1000 - ₹1200" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, budget: option.value }))
                      }
                      className={`px-4 py-3 text-sm md:text-base rounded-full border-2 transition-all ${
                        formData.budget === option.value
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg"
                          : "bg-white border-purple-200 text-gray-700 hover:border-purple-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-5 h-5 flex-shrink-0 rounded border-purple-300 text-purple-600 focus:ring-purple-400 focus:ring-2"
                />
                <label className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  I agree to participate and understand the privacy terms. All
                  information shared will be kept confidential.
                </label>
              </div>

              {/* Submit Button */}
              {submitError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {submitError}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 md:py-4 text-sm md:text-base bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Sending..." : "Submit Application"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4 text-gray-900">Why Choose Us</h2>
            <p className="text-lg text-gray-600">
              Your well-being is our top priority
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Confidential & Safe",
                description:
                  "Your privacy is protected. All sessions are secure and completely confidential.",
                image:
                  "https://images.unsplash.com/photo-1763982811968-14e8aba3be09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwc3VwcG9ydCUyMGNhcmluZyUyMGhhbmRzfGVufDF8fHx8MTc3NTU4NzI3MXww&ixlib=rb-4.1.0&q=80&w=1080",
              },
              {
                icon: Users,
                title: "Personalized Support",
                description:
                  "Tailored approaches designed specifically for your unique needs and goals.",
                image:
                  "https://images.unsplash.com/photo-1737311208391-9ae79f1d323f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGFic3RyYWN0JTIwc29mdHxlbnwxfHx8fDE3NzU1ODcyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
              },
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description:
                  "Book sessions at times that work for you, with both online and in-person options.",
                image:
                  "https://images.unsplash.com/photo-1758705739493-93577f7bf172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMGxhdmVuZGVyfGVufDF8fHx8MTc3NTU4NzI3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-2xl mb-2">Emotional Wellness Sessions</h3>
              <p className="text-purple-200">Your privacy is our priority</p>
            </div>
            <div className="border-t border-purple-700 pt-6 mt-6">
              <p className="text-purple-300">
                © 2026 Emotional Wellness Sessions. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
      />

      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>
    </div>
  );
}
