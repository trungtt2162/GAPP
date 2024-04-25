import { Button, useTheme } from "@mui/material";
import { theme } from "../../../theme";

const PrimaryButton = ({ title, event }) => {
  const { palette } = useTheme(theme);

  return (
    <Button
    className="primary-button-custom"
      variant="text"
      sx={{
        // width: "10rem",
        p: ".5rem 1.5rem",
        backgroundColor: palette.primary.main,
        color: "#ffffff",
        borderRadius: 2,
        // alignSelf: { xs: "center", md: "flex-start" },
        "&:hover": { backgroundColor: palette.primary.main,opacity:0.7 },
      }}
      onClick={() => {
        if (event) {
          event();
        }
      }}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
