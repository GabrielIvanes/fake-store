import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Props {
  handleClick: () => void;
}

function HeartIcon({ handleClick }: Props) {
  return (
    <FontAwesomeIcon
      className="heart"
      icon={faHeart}
      style={{ color: "#ff0000" }}
      onClick={handleClick}
    />
  );
}

export default HeartIcon;
