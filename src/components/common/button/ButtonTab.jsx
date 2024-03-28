import { useTheme } from "@emotion/react";
import { theme } from "../../../theme";
import { useNavigate } from "react-router-dom";

const ButtonTab = ({ text, value, index, onClick,noMargin,path }) => {
    const { palette } = useTheme(theme);
    const navigate = useNavigate()
  return (
    <div
      onClick={() => {
        onClick(1)
        if(path){
          navigate(path)
        }
      }}
      className={`tabItem ${index===value ?"tabItem-active" :""}`}
      style={{
        color: `black`,
        marginRight: !noMargin && 40,
      }}
    >
      {text}
    </div>
  );
};
export default ButtonTab;
