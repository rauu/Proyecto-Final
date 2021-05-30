import React from "react";
import "./SetMetting.css";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import Link from "react-router-dom/Link";
import { AllNotices } from "../../service/Notices";
import parse from "html-react-parser";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotFound from "../notFound/NotFound";

const SetMetting = () => {
  return (
    <>
      <NavPrivate></NavPrivate>
    </>
  );
};

export default SetMetting;
