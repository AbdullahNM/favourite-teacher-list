const TeacherModel = require("../models/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class TeacherController {

    static async Add(req, res, next) {
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
      }

      static async GetAll(req, res, next){
        try {
          const data = await TeacherModel.find();
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

      static async GetOne(req, res, next){
        try {
          const data = await TeacherModel.findById(req.params.id);
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

      static async GetMostLiked(req, res, next){
        const result = await TeacherModel.find({}).sort({ count: -1 }).limit(1);
        res.status(200).json(result);
      }
}

module.exports = TeacherController