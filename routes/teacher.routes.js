const { application } = require("express");
const express = require("express");
const TeacherModel = require("../models/teacher.model");
const jwt = require("jsonwebtoken");
const teacherRoutes = express.Router();
const TeacherCtrl = require('./teacher.controller')
module.exports = teacherRoutes;

//Post Method
teacherRoutes.post("/add", TeacherCtrl.Add);

//Get all Method
teacherRoutes.get("/getAll", TeacherCtrl.GetAll);

//Get by ID Method
teacherRoutes.get("/getOne/:id", TeacherCtrl.GetOne);

teacherRoutes.get("/getMostFav", TeacherCtrl.GetMostLiked);
