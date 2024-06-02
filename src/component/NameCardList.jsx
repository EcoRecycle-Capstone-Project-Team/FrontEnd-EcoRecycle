import PropTypes from "prop-types";
import NameCardItem from "./NameCardItem";

export default function NameCardList({ team }) {
  return (
    <div className="row">
      {team.map((member, index) => (
        <NameCardItem key={index} name={member.name} jobdesk={member.jobdesk} />
      ))}
    </div>
  );
}

NameCardList.propTypes = {
  team: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      jobdesk: PropTypes.string.isRequired,
    })
  ).isRequired,
};
