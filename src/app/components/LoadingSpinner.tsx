import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-100/50"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="relative w-16 h-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
            />
          </div>
          
          {/* Text */}
          <p className="text-gray-700">Submitting your application...</p>
        </div>
      </motion.div>
    </div>
  );
}
