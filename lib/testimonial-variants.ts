// Animation variants for image
const imageVariants = {
  enter: () => ({
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    scale: 1,
  },
  exit: () => ({
    opacity: 0,
    scale: 0.98,
  }),
};

// Animation variants for content
const contentVariants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

// Stagger children animation
const containerVariants = {
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  center: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export { imageVariants, contentVariants, containerVariants };
