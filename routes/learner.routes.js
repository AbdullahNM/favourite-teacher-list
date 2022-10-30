const { application } = require("express");
const express = require("express");
const LearnerModel = require("../models/learner.model");
const jwt = require("jsonwebtoken");
const Auth = require("../Auth/Auth");
const learnerRoutes = express.Router();
const LearnerCtrl = require('./learner.controller')
module.exports = learnerRoutes;


//Get all Method
learnerRoutes.get("/getAll", LearnerCtrl.GetAll);

//Get by ID Method
learnerRoutes.get("/getOne/:id", );

//Add/Register new student give student details in body
learnerRoutes.post("/add", LearnerCtrl.Add);

//Login ... Generate jwt Token
learnerRoutes.post('/login',LearnerCtrl.Login)


// Add teacher to favourite list
learnerRoutes.patch('/addfavourite',Auth,LearnerCtrl.AddFav)


//Remove teacher from favourite list
learnerRoutes.patch('/removefavourite',Auth,LearnerCtrl.Removefav)

