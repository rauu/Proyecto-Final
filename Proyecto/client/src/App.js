import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import Home from "./components/home/Home";

import theme from "./CoustumTheme";
import Register from './components/Register/Register';
import WorkWithUS from './components/work-with-us/WorkWithUs';
import Login from './components/Login/Login';
import Dashboard from "./components/dashboard/Dashboard";

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
          <Switch>
            <Route exact path="/workwithus" component={WorkWithUS} />
          </Switch>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
        </Typography>
      </ThemeProvider>
    </div>
  );
}

export default App;
