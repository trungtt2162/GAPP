import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(242, 184, 79)",
            light: "#e2f5ef",
            dark: "#204945",
        },
        secondary: {
            main: "#55bcc9",
            light: "#c1eadd",
            dark: "#312E43",
        },
        text: {
            primary: "#23262F",
            secondary: "#777E90",
        },
    },
    typography: {
        fontFamily: "Red Hat Text",
        head: {
            fontFamily: "Anybody",
        },
        button: {
            textTransform: "none",
            fontSize: "1rem",
        },
    },
});