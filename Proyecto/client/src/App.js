import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import Home from "./components/home/Home";

import theme from "./CoustumTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
