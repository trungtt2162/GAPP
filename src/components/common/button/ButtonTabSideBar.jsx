import { useTheme } from "@emotion/react";
import { theme } from "../../../theme";
import { useNavigate } from "react-router-dom";

const ButtonTabSideBar = ({ text, value, index, onClick,noMargin,path }) => {
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
      className="tabItemSideBar"
      style={{
        // border: index === value && `1px solid ${palette.secondary.light} `,
        background: index === value && `${"#1d2531"} `,
        // color: index === value ? `white` : `${palette.primary.main}`,
        marginRight: !noMargin && 20,
      }}
    >
      {text}
    </div>
  );
};
export default ButtonTabSideBar;
