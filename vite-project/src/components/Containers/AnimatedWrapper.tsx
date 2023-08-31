import { motion } from "framer-motion";

// const slideAnimation = {
//   initial: {
//     opacity: 0,
//     x: 100,
//   },
//   animate: {
//     opacity: 1,
//     x: 0,
//   },
//   exit: {
//     opacity: 0,
//     x: -100,
//   },
// };

const zoomAnimation = {
  initial: {
    opacity: 0,
    scale: 0.8, // Initial scale value
  },
  animate: {
    opacity: 1,
    scale: 1, // Target scale value (1 is the original size)
  },
  exit: {
    opacity: 0,
    scale: 1.2, // Exiting scale value
  },
};

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

export default function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  return (
    <motion.div
      variants={zoomAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
