import { motion } from 'framer-motion';

interface LoadingProps {
  dotCount?: number;
  dotSize?: number;
  dotColor?: string;
  speed?: number;
}

export default function Loading({ dotCount = 3, dotSize = 10, dotColor = '#3498db', speed = 0.5 }: LoadingProps) {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: speed / 2,
      },
    },
    end: {
      transition: {
        staggerChildren: speed / 2,
      },
    },
  };

  const dotVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const dotTransition = {
    duration: speed,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut',
  };

  return (
    <motion.div
      className="flex items-center justify-center space-x-2"
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[...Array(dotCount)].map((_, index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: dotColor,
          }}
          variants={dotVariants}
          transition={dotTransition}
        />
      ))}
    </motion.div>
  );
}
