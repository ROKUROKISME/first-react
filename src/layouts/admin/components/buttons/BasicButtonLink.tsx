import { Link } from "react-router-dom";

interface BasicButtonLinkProps {
  text: string;
  link: string;
  color: string;
  icon: string;
}

const BasicButtonLink = ({ text, link, color, icon }: BasicButtonLinkProps) => {
  return (
    <Link to={link} className={`btn btn-${color || "primary"} m-1`}>
      <i className={`bx ${icon || "bx-left-arrow-alt"} me-1`} />
      {text || "Button"}
    </Link>
  );
};

export default BasicButtonLink;
