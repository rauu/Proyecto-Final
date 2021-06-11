import NavPrivate from "../nav-private/Nav-Private";
import React, { useState, useEffect } from "react";
import "./Video.css";
import { Fade } from "react-reveal";
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
  Card,
  CardContent,
  Tooltip,
} from "@material-ui/core/";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GetVideo, DeleteVideo } from "../../service/Video";
import {
  GetVideoComments,
  VideoComment,
  DeleteVideoComment,
} from "../../service/Comments";
import serverURL from "../../utils/serverURL";
const moment = require("moment-timezone");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
    fontSize: "20px",
  },
}));
const url = serverURL;

const Video = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const pathname = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [video, setVideo] = useState(null);
  const [allComments, setAllComments] = React.useState(null);
  const [commentError, setCommentError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [comment, setComment] = React.useState({
    comments: "",
  });

  useEffect(() => {
    GetVideo(pathname, userInfo.id_user).then((res) => {
      setVideo(res);
    });
    GetVideoComments(pathname).then((res) => {
      setAllComments(res);
    });
  }, []);

  const handleChangeComment = (event) => {
    setComment({ ...comment, [event.target.name]: event.target.value });

    if (commentError.error) {
      setCommentError({
        error: false,
        errorMessage: "",
      });
    }
  };
  const handleSubmitComment = () => {
    if (comment.comments === "") {
      setCommentError({
        error: true,
        errorMessage: "You have to write a comment to upload it.",
      });
    } else {
      VideoComment(pathname, userInfo.id_user, comment.comments).then((res) => {
        GetVideoComments(pathname).then((res) => {
          setAllComments(res);
        });
      });
      setCommentError({
        error: false,
        errorMessage: "",
      });
    }
  };
  const commentDelete = (commentID) => {
    DeleteVideoComment(commentID).then((res) => {
      GetVideoComments(pathname).then((res) => {
        setAllComments(res);
      });
    });
  };
  const videoDelete = (videoID) => {
    /* DeleteVideoComment(commentID).then((res) => {
      console.log(res);
      GetVideoComments(pathname).then((res) => {
        setAllComments(res);
      });
    }); */
    if (window.confirm("Do you really want to delete this video?")) {
      DeleteVideo(videoID).then((res) => {
        if (res === true) {
          history.push("/dashboard");
        }
      });
    }
  };

  return (
    <>
      <NavPrivate></NavPrivate>

      {video == null && (
        <>
          <div className="divLoader">
            <div className={classes.root} id="ball">
              <CircularProgress />
            </div>
          </div>
        </>
      )}

      {video === false && (
        <>
          <NotFound></NotFound>
        </>
      )}
      {video && (
        <>
          <br />
          <div className="singleVideo">
            <Grid
              container
              spacing={5}
              className="grid-center "
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="">
                  <video
                    /*  onClick={(e) => e.preventDefault()} */
                    onContextMenu={(e) => e.preventDefault()}
                    className="showVideo"
                    controls
                  >
                    <source src={url + video.video} />
                  </video>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} className="videoInfo">
                <div className="videoDescription">
                  <Typography variant="h4">{video.video_name}</Typography>

                  <Typography variant="body">
                    {video.video_description}
                  </Typography>

                  <Typography variant="body2">
                    Date Uploded:{" "}
                    {moment(video.date_upload).format("DD.MM.YYYY")}
                  </Typography>
                  {(userInfo.role_user === "role_admin" ||
                    video.id_user === userInfo.id_user) && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        type="button"
                        onClick={videoDelete.bind(this, video.id_video)}
                      >
                        Delete Video
                      </Button>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="commentVideos">
                  <Typography variant="h2" style={{ textAlign: "left" }}>
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
                                <Card className="commentsVideo">
                                  <CardContent className="comment">
                                    <Typography variant="body1">
                                      <b>{val.username}</b> : {val.content}
                                    </Typography>

                                    <Typography variant="body2">
                                      {moment(val.date_upload).format(
                                        "DD.MM.YY"
                                      )}
                                      {(userInfo.role_user === "role_admin" ||
                                        video.id_user === userInfo.id_user ||
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
          </div>
        </>
      )}
    </>
  );
};

export default Video;
