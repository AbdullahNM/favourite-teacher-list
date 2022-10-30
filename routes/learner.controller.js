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

  static async Login(req, res, next) {
    LearnerModel.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "2h",
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
            });
          }
          res.status(401).json({
            message: "Auth failed",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }

  static async GetOne(req, res, next) {
    try {
      const data = await LearnerModel.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async AddFav(req, res, next) {
    try {
      const result = await LearnerModel.findById(req.userdata.userId);
      console.log(result);

      const teacher = await TeacherModel.findOne({ name: req.body.new });
      if(teacher)
      {
      teacher.count++;
      teacher.save();
      if (req.body.new) result.favourite.push(req.body.new);

      result.save();
      res.status(200).json({ result: result, teacher: teacher });
      }
      else{
        res.send('Bad Request')
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async Removefav(req, res, next) {
    try {
      const result = await LearnerModel.findById(req.userdata.userId);
      console.log(result);
      const teacher = await TeacherModel.findOne({ name: req.body.new }).catch((err)=>{
        res.status(201).json({message: err.message})
      });
      if(teacher && teacher.count>=1)
      {
      teacher.count--;
      teacher.save();
      if (req.body.new) result.favourite.pull(req.body.new);

      result.save();
      res.status(200).json({ result: result, teacher: teacher });
      }
      else{
        res.send('Bad Request')
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = LearnerController;
