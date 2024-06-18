/* eslint-disable react/prop-types */
import NameCardItem from "./NameCardItem";
import "./NameCard.css";

export default function NameCardList({ team }) {
  return (
    <div className="name-card-list">
      {team.map((member, index) => (
        <NameCardItem
          key={index}
          name={member.name}
          jobdesk={member.jobdesk}
          imageUrl={member.imageUrl}
          instagramUrl={member.instagramUrl}
          linkedinUrl={member.linkedinUrl}
          githubUrl={member.githubUrl}
        />
      ))}
    </div>
  );
}
