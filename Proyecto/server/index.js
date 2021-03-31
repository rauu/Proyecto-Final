const express = require("express");
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
     console.log(`Running on port ${PORT}`);
   
   });
   