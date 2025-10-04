// Animation variants for image
type ImageVariantsProps = {
  enter: (direction: number) => { x: number; opacity: number; scale: number };
  center: { x: number; opacity: number; scale: number };
  exit: (direction: number) => { x: number; opacity: number; scale: number };
};

const imageVariants: ImageVariantsProps = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
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
