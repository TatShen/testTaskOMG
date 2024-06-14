import PropTypes from "prop-types";

export const SvgLines = ({ positions, className }) => {
  if (positions.length < 2) return null;

  const radius = 12;

  const circles = positions.map((point, index) => (
    <circle key={index} cx={point.x} cy={point.y} r={radius} fill="#638ec4" />
));

const lines = [];
for (let i = 1; i < positions.length; i++) {
    const prevPoint = positions[i - 1];
    const currPoint = positions[i];
    lines.push(
        <line
            key={i - 1}
            x1={prevPoint.x}
            y1={prevPoint.y}
            x2={currPoint.x}
            y2={currPoint.y}
            stroke="#638ec4"
            strokeWidth="21"
            strokeLinecap="round"
        />
    );
}

return (
    <svg width={280} height={280} className={className}>
        {circles}
        {lines}
    </svg>
);
};

SvgLines.propTypes = {
  positions: PropTypes.array,
  className: PropTypes.string,
};
