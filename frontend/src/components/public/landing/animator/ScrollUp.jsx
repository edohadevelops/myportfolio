import { motion } from "framer-motion";

const directionVariants = {
  up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },         visible: { opacity: 1 } },
};

const ScrollToView = ({
  children,
  direction = "up",
  classNames = "",
  identifier,
  onClick,
  delay = 0,
}) => {
  const variants = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      className={classNames}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default ScrollToView;
