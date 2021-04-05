import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import Home from "./components/home/Home";

import theme from "./CoustumTheme";
import Register from './components/Register/Register';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Typography component={'div'}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Switch>
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
        </Typography>
      </ThemeProvider>
    </div>
  );
}

export default App;
