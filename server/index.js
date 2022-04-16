const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config(); 

app.use(cors);
app.use(express.json());

//Connection to mongodb
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`Connected to MONGODB..`)
})
.catch((err) => {
    console.log(err);
});


//creating server
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
});
