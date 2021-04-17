function router(app){

     app.use('/users', require('./src/users'));
     app.use('/workwithus', require('./src/work_with_us'))
 
 }
 
 module.exports = router;