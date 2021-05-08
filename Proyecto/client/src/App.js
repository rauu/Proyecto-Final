import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import Home from "./components/home/Home";

import theme from "./CoustumTheme";
import Register from "./components/Register/Register";
import WorkWithUS from "./components/work-with-us/WorkWithUs";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ContactUs from "./components/contactUs/ContactUs";
import Pricing from "./components/pricing/Pricing";
import Notices from "./components/notices/Notices";
import UploadVideos from "./components/uploadVideos/UploadVideo";
import UploadNotices from "./components/uploadNotices/UploadNotice";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import NotFound from "./components/notFound/NotFound";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography component={"div"}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/workwithus" component={WorkWithUS} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/contactUs" component={ContactUs} />
              <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/notices" component={Notices} />
              <Route exact path="/uploadVideos" component={UploadVideos} />
              <Route exact path="/uploadNotice" component={UploadNotices} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />

              <Route path="/*" component={NotFound} />
            </Switch>
          </Router>
        </Typography>
      </ThemeProvider>
    </div>
  );
}

export default App;
