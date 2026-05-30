import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative background blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-300/30 to-pink-300/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-indigo-300/30 to-purple-300/20 rounded-full blur-3xl"></div>

              {/* Modal Content */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-100/50">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Success Icon with Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="relative mb-6 flex justify-center"
                >
                  {/* Pulsing glow effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400/30 to-green-400/30 rounded-full blur-xl"></div>
                  </motion.div>

                  {/* Main Icon */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl md:text-3xl mb-4 text-gray-900">
                    Your Application Has Been Submitted
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Thank you for sharing your details. We'll review your
                    application and get back to you soon. Please keep an eye on
                    your email or phone for updates.
                  </p>
                  <p className="text-purple-600 flex items-center justify-center gap-2">
                    You've taken a great step towards your well-being 🌿
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <span className="relative z-10">Close</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-3 bg-white border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-all"
                  >
                    Go Back to Home
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
