const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
require('dotenv').config(); 

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

//create connection with mongodb
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`Connected to MONGODB..`))
.catch((error) => console.log(error));


//create server
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
});
