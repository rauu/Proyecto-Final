const express = require("express");
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

require('./src/routes')(app);


app.listen(PORT, () => {
     console.log(`Running on port ${PORT}`);
   
   });
   