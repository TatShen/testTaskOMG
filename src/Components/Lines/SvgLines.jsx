import PropTypes from "prop-types";

export const SvgLines = ({ positions, className }) => {
    if (positions.length < 2) return null;

    const pathData = positions.reduce((acc, point, index) => {
        if (index === 0) {
          return `M ${point.x} ${point.y}`;
        } else {
          const prevPoint = positions[index - 1];
          const deltaX = point.x - prevPoint.x;
          const deltaY = point.y - prevPoint.y;
         
          const curve = `Q ${prevPoint.x + deltaX / 2} ${prevPoint.y + deltaY / 2} ${point.x} ${point.y}`;
          return `${acc} ${curve}`;
        }
      }, "");
      
  return (
    <svg width="295" height="295" className={className}>
      <path
        d={pathData}
        stroke="#638ec4"
        strokeWidth="21"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

SvgLines.propTypes = {
  positions: PropTypes.array,
  className: PropTypes.string,
};
