import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF4810",
    },
    secondary: {
      main: "#333232",
    },
  },
  typography: {
    fontFamily: "Signika",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1:{
      fontSize: "4rem",
    },
    h2:{
      fontSize: "3.5rem",
    },
    h3:{
      fontSize: "3rem",
    },
    h4:{
      fontSize: "2.5rem",
    },
    h5:{
      fontSize: "2rem",
    },
    h6:{
      fontSize: "1.5rem",
    },
    body1:{
      fontSize: "1.5rem",
      fontWeight: 300,
    },
  },
});

export default theme;
