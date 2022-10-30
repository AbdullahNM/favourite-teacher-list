const { application } = require("express");
const express = require("express");
const TeacherModel = require("../models/teacher.model");
const jwt = require("jsonwebtoken");
const teacherRoutes = express.Router();

module.exports = teacherRoutes;

//Post Method
teacherRoutes.post("/add", async (req, res, next) => {
  TeacherModel.find({ name: req.body.name })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Teacher exists",
        });
      } else {
        const dataToSave = new TeacherModel({
          name: req.body.name,
          age: parseInt(req.body.age),
          subject: req.body.subject,
          count: 0,
        });
        dataToSave
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "TeacherModel created",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Get all Method
teacherRoutes.get("/getAll", async (req, res, next) => {
  try {
    const data = await TeacherModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
teacherRoutes.get("/getOne/:id", async (req, res, next) => {
  try {
    const data = await TeacherModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

teacherRoutes.get("/getMostFav", async (req, res, next) => {
  const result = await TeacherModel.find({}).sort({ count: -1 }).limit(1);
  res.status(200).json(result);
});
