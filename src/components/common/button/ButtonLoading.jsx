import { Button, useTheme } from "@mui/material";
import { theme } from "../../../theme";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonLoading = ({ title, event, loading }) => {
  const { palette } = useTheme(theme);

  return (
    <Button
      variant="text"
      sx={{
        // width: "10rem",
        p: ".5rem 1.5rem",

        backgroundColor: loading ? "gray": palette.primary.main,
        color: "#ffffff",
        borderRadius: 2,
        alignSelf: { xs: "center", md: "flex-start" },
        boxShadow: ` 0px 7px 5px 0px ${palette.primary.light}}`,
        // "&:hover": {  color: `${palette.primary.main}!important` },
      }}
      onClick={() => {
        if (event) {
          event();
        }
      }}
    >
      {loading && (
        <CircularProgress
          size={18}
         
          style={{
            marginRight: 10,
            color:"#fff"
          }}
        />
      )}
      {title}
    </Button>
  );
};

export default ButtonLoading;
