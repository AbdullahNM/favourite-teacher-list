require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const learnerRoutes = require('./routes/learner.routes');
const teacherRoutes = require('./routes/teacher.routes');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use(cors())
app.use('/learner', learnerRoutes);

app.use('/teacher', teacherRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})