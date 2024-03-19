import { useTheme } from "@emotion/react";
import { theme } from "../../../theme";
import ButtonTab from "../button/ButtonTab";

const TabSidebar = ({ listSideBar ,event=() =>{},value}) => {
    const { palette } = useTheme(theme);
  return (
    <div
      className="shadown"
      style={{
        display: "flex",
        paddingTop: 10,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth:250,
        height:"calc(100vh - 100px)",
        gap: "1.5rem",
        p: "4rem 2rem ",
        borderRadius: "3px",
        boxShadow: ` 0px 0px 15px -3px ${palette.secondary.light}}`,
        background: `${palette.secondary.main}`,
      }}
    >
      {listSideBar.map((item) => (
        <ButtonTab
          noMargin
          text={item.name}
          onClick={() => event(item.key)}
          index={item.key}
          value={value}
        />
      ))}
    </div>
  );
};
export default TabSidebar;
