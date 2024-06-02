import PropTypes from "prop-types";

export default function NameCardItem({ name, jobdesk }) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="bg-secondary" style={{ height: "200px" }}></div>
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{jobdesk}</p>
        </div>
      </div>
    </div>
  );
}

NameCardItem.propTypes = {
  name: PropTypes.string.isRequired,
  jobdesk: PropTypes.string.isRequired,
};
