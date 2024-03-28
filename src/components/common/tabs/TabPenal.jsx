import { useNavigate } from "react-router-dom";

const TabPenal = ({ index, value, children, path }) => {
  const navigate = useNavigate();
  if (index === value) return <div onClick={() => {}}>{children}</div>;
  else return <></>;
};
export default TabPenal;
