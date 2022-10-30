const LearnerModel = require("../models/learner.model");
const TeacherModel = require("../models/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LearnerController {
  static async Add(req, res, next) {
    LearnerModel.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new LearnerModel({
                name: req.body.name,
                age: parseInt(req.body.age),
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: "LearnerModel created",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }

  static async GetAll(req, res, next) {
    try {
      const result = await LearnerModel.find();
      res.status(200).json(result);
    } catch (error) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }
}

module.exports = LearnerController;
