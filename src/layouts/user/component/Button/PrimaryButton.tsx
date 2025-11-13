import { Link } from "react-router-dom";

interface PrimaryButtonProps {
  text: string;
  link: string;
}

const PrimaryButton = ({ text, link }: PrimaryButtonProps) => {
  return (
    <Link
      to={link}
      className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">
      {text || "Button"}
    </Link>
  );
};

export default PrimaryButton;
