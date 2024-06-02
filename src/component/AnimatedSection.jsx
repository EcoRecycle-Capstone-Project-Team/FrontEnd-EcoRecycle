import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

const AnimatedSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
      {children}
    </div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimatedSection;
