const db = require("../config/db_connection");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);

function index(req, res) {
  const username = req.query.username;
  let privateVideos = [];
  let publicVideos = [];
  let trainerSubs = [];
  let videos = [];

  const getPublicVideos = "SELECT * FROM videos WHERE type_video = 'public'";
  const getPrivateVideos =
    "SELECT * FROM videos WHERE type_video = 'private' AND id_user= ?";

  const getUserID = "SELECT id_user FROM users WHERE username = ?";
  const getSubsName = "SELECT * FROM subscriptions WHERE id_user = ?";
  db.query(getUserID, [username], (err, result) => {
    if (err) {
      console.log(err);

      res.send(false);
    } else {
      let userID = result[0].id_user;
      db.query(getSubsName, [userID], (err, result) => {
        if (err) {
          console.log(err);
          re.send(false);
        } else {
          for (val of result) {
            let range = moment().range(
              moment(val.start_date).format("YYYY-MM-DD"),
              moment(val.expire_date).format("YYYY-MM-DD")
            );
            if (range.contains(moment())) {
              trainerSubs.push(val.id_user_trainer);
            }
          }
          db.query(getPublicVideos, [userID], async (err, result) => {
            if (err) {
              console.log(err);
              await res.send(false);
            } else {
              for (value of result) {
                videos.push(value);
              }
              for (let [index, i] of trainerSubs.entries()) {
                db.query(getPrivateVideos, [i], async (err, result) => {
                  if (err) {
                    console.log(err);
                    res.send(false);
                  } else {
                    for (value of await result) {
                      videos.push(value);
                    }
                  }
                  if (index == trainerSubs.length - 1) {
                    await res.send(
                      videos.sort(
                        (a, b) => (a.id_video < b.id_video && 1) || -1
                      )
                    );
                  }
                });
              }
              setTimeout(async () => {}, 2000);

              /*               await res.send(privateVideos)
               */
              /* setInterval(() => {
                /* console.log(privateVideos);
                
                videos.sort((a, b) => a.id_video < b.id_video && 1 || -1)

                res.send(videos);
              }, 2000); */
            }
          });
        }
      });
    }
  });
}

module.exports = {
  index: (req, res) => index(req, res),
};
