import { useTheme } from "@emotion/react";
import { theme } from "../../../theme";
import ButtonTab from "../button/ButtonTab";
import { useNavigate } from "react-router-dom";
import ButtonTabSideBar from "../button/ButtonTabSideBar";

const TabSidebar = ({ listSideBar ,event=() =>{},value}) => {
    const { palette } = useTheme(theme);
    const navigate = useNavigate();
  return (
    <div
      className="shadown"
      style={{
        display: "flex",
        paddingTop: 30,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth:250,
        height:"calc(100vh - 80px)",
        borderRadius: "3px",
        boxShadow: ` 0px 0px 15px -3px ${palette.secondary.light}}`,
        background: `${palette.primary.main}`,
      }}
    >
      {listSideBar.map((item) => (
        <ButtonTabSideBar
          noMargin
          text={item.name}
          onClick={() =>{
            event(item.key)
            if(item.path){
            navigate(item.path);
            }
          }}
          index={item.key}
          value={value}
        />
      ))}
    </div>
  );
};
export default TabSidebar;
