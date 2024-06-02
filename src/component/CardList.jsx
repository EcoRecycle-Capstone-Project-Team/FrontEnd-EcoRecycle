import PropTypes from "prop-types";
import CardItem from "./CardItem";

export default function CardList({ items }) {
  return (
    <div className="container mt-5 card-list">
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <CardItem src={item.src} title={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
};
