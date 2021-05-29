import React from "react";
import "./Notices.css";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import Link from "react-router-dom/Link";

import {
  Typography,
  Backdrop,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core/";
const moment = require("moment-timezone");

const Notices = () => {
  return (
    <>
      <NavPrivate></NavPrivate>
    </>
  );
};

export default Notices;
