import React from "react";
import NavPrivate from "../nav-private/Nav-Private";
import "./Notice.css";
import { useLocation, useHistory, Link } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  FormHelperText,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  Tooltip,
} from "@material-ui/core/";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import parse from "html-react-parser";
import { GetNotice, DeleteNotice } from "../../service/Notice";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  GetNewsComments,
  NewsComment,
  DeleteNewsComment,
} from "../../service/Comments";
import serverURL from "../../utils/serverURL";
const url = serverURL;
const moment = require("moment-timezone");
var crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = "d6F3Efeq";
function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Notice = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const pathname = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );
  const [notice, setNotice] = React.useState(null);
  const [comment, setComment] = React.useState({
    comments: "",
  });
  const [allComments, setAllComments] = React.useState(null);
  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  const [commentError, setCommentError] = React.useState({
    error: false,
    errorMessage: "",
  });

  React.useEffect(() => {
    GetNotice(pathname).then((res) => {
      setNotice(res);
    });
    GetNewsComments(pathname).then((res) => {
      setAllComments(res);
    });
  }, []);

  const handleSubmitComment = () => {
    if (comment.comments === "") {
      setCommentError({
        error: true,
        errorMessage: "You have to write a comment to upload it.",
      });
    } else {
      NewsComment(pathname, userInfo.id_user, comment.comments).then((res) => {
        GetNewsComments(pathname).then((res) => {
          setAllComments(res);
        });
      });
      setCommentError({
        error: false,
        errorMessage: "",
      });
    }
  };
  const handleChangeComment = (event) => {
    setComment({ ...comment, [event.target.name]: event.target.value });

    if (commentError.error) {
      setCommentError({
        error: false,
        errorMessage: "",
      });
    }
  };
  const noticeDelete = (id_news) => {
    if (window.confirm("Do you really want to delete this video?")) {
      DeleteNotice(id_news).then((res) => {
        if (res === true) {
          history.push("/news");
        }
      });
    }
  };

  const commentDelete = (commentID) => {
    DeleteNewsComment(commentID).then((res) => {
      GetNewsComments(pathname).then((res) => {
        setAllComments(res);
      });
    });
  };

  return (
    <>
      <NavPrivate></NavPrivate>

      {notice == null && (
        <>
          <br />
          <br />
          <div className="divLoader">
            <div className={classes.root} id="ball">
              <CircularProgress />
            </div>
          </div>
        </>
      )}

      {notice === false && (
        <>
          <NotFound></NotFound>
        </>
      )}

      {notice && (
        <>
          <Grid
            container
            spacing={5}
            className="grid-center"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <br />
              <div className="noticediv">
                <img
                  src={url + notice.image_uploded}
                  alt={notice.id_news}
                  className="noticeImage"
                />
                <br />
                <br />
                <Typography variant="h1">{notice.title}</Typography>
                <Typography variant="body">
                  Uploded on: {moment(notice.date_upload).format("DD.MM.YYYY")}
                </Typography>
                <br />
                <br />
                <div className="noticeContent">
                  {parse(decrypt(notice.content))}
                </div>
                {(userInfo.role_user === "role_admin" ||
                  notice.id_user === userInfo.id_user) && (
                  <>
                   <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        type="button"
                        onClick={noticeDelete.bind(this, notice.id_news)}
                      >
                        Delete Notice
                      </Button>
                  </>
                )}
              </div>
            </Grid>
            <br />
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <br />
              <div className="noticeComment">
                <Typography variant="h2" style={{ textAlign: "center" }}>
                  Comments
                </Typography>

                <TextField
                  variant="outlined"
                  name="comments"
                  required
                  fullWidth
                  label="Write your comment here..."
                  onChange={handleChangeComment}
                  inputProps={{
                    maxlength: 255,
                  }}
                  error={commentError.error}
                  helperText={
                    commentError.error
                      ? commentError.errorMessage
                      : `${comment.comments.length}/${255}`
                  }
                />
                <div className="commentSend">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    type="button"
                    onClick={handleSubmitComment}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <br />
              <div className="allComments">
                {allComments == null && (
                  <>
                    <div className="divLoader">
                      <div className={classes.root} id="ball">
                        <CircularProgress />
                      </div>
                    </div>
                  </>
                )}

                {allComments !== false && allComments !== null && (
                  <>
                    <Grid
                      container
                      spacing={5}
                      className="grid-center"
                      alignItems="center"
                      justify="center"
                    >
                      {allComments.map((val) => {
                        return (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              key={val.id_comment}
                            >
                              <Card className="comments">
                                <CardContent className="comment">
                                  <Typography variant="body1">
                                    <b>{val.username}</b> : {val.content}
                                  </Typography>

                                  <Typography variant="body2">
                                    {moment(val.date_upload).format("DD.MM.YY")}
                                    {(userInfo.role_user === "role_admin" ||
                                      notice.id_user === userInfo.id_user ||
                                      val.username === userInfo.username) && (
                                      <>
                                        <Tooltip title="Delete this comment">
                                          <DeleteRoundedIcon
                                            onClick={commentDelete.bind(
                                              this,
                                              val.id_comment
                                            )}
                                            className="deleteIcon"
                                            fontSize="small"
                                            color="primary"
                                          ></DeleteRoundedIcon>
                                        </Tooltip>
                                      </>
                                    )}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </>
                )}
                {allComments === false && allComments !== null && (
                  <>
                    <Typography variant="body1">
                      <i>Currently there are no comments</i>
                    </Typography>
                  </>
                )}
              </div>
            </Grid>
          </Grid>

          {/*  <div key={val.id_news}></div>
           */}
        </>
      )}
    </>
  );
};

export default Notice;
