import { useTheme } from "@emotion/react";
import { theme } from "../../../theme";

const ButtonTab = ({ text, value, index, onClick,noMargin }) => {
    const { palette } = useTheme(theme);
  return (
    <div
      onClick={() => onClick(1)}
      className="tabItem border"
      style={{
        border: index === value && `1px solid ${palette.secondary.light} `,
        background: index === value && `${palette.primary.main} `,
        color: index === value ? `white` : `${palette.primary.main}`,
        marginRight: !noMargin && 20,
      }}
    >
      {text}
    </div>
  );
};
export default ButtonTab;
