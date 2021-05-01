import "./UploadVideo.css";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";

import {
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Snackbar,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";

const UploadVideos = () => {
  return (
    <>
      <Typography>
        <NavPrivate></NavPrivate>
        <div className="uploadVideo">
          <div className="upload-first">
            <Fade right>
              <br />
              <Typography variant="h2" className="white">
                UPLOAD VIDEO
              </Typography>
              <br />
            </Fade>
          </div>
          <br />

          <div className="upload-form">
            <Fade left>
            <br />
          <br />
          <br />

          <form noValidate autoComplete="off">
            <Grid
              container
              spacing={5}
              className="grid-center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="surname"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                 
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Your Email"
                  
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <input
                  accept="application/pdf"
                  name="cv"
                  className="upload"
                  id="contained-button-file"
                  multiple
                  type="file"
                  required
                  
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ fontSize: 25 }}
                  >
                    Upload your CV
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  variant="outlined"
                  name="message"
                  multiline
                  required
                  rows="5"
                  fullWidth
                  label="Your Message"
                 
                />
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              className="button"
              type="submit"
            >
              Send your CV
            </Button>
          </form>
          <br />
          <br />
            </Fade>
          </div>
        </div>
      </Typography>
    </>
  );
};

export default UploadVideos;
