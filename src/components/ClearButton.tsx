import { IoIosCloseCircleOutline } from "react-icons/io";

interface ClearButtonProps {
  onClick: () => void;
}

const ClearButton = ({ onClick }: ClearButtonProps) => (
  <button style={{fontSize: '24px'}}onClick={onClick}>
    <IoIosCloseCircleOutline />
  </button>
);

export default ClearButton;
