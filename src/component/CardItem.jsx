import PropTypes from "prop-types";

export default function CardItem({ src, title }) {
  return (
    <div style={{ border: "none", padding: 0, background: "none" }}>
      <img
        src={src}
        alt={title}
        className="card-img-top"
        style={{ width: "100%", minHeight: "235px" }}
      />
    </div>
  );
}

CardItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};
