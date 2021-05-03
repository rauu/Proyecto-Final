function router(app){

     app.use('/users', require('./src/users'));
     app.use('/workwithus', require('./src/work_with_us'))
     app.use('/login', require('./src/login'))
     app.use('/contactUs', require('./src/contactUs'))
     app.use('/uploadVideo', require('./src/uploadVideos'))
 
 }
 
 module.exports = router;