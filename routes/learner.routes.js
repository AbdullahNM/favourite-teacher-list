const { application } = require("express");
const express = require("express");
const LearnerModel = require("../models/learner.model");
const jwt = require("jsonwebtoken");
const Auth = require("../Auth/Auth");
const learnerRoutes = express.Router();
const LearnerCtrl = require('./learner.controller')
module.exports = learnerRoutes;

//Post Method
// learnerRoutes.post("/post", async (req, res) => {
//   const data = new LearnerModel({
//     name: req.body.name,
//     age: req.body.age,
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

//Get all Method
learnerRoutes.get("/getAll", async (req, res) => {
  try {
    const data = await LearnerModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
learnerRoutes.get("/getOne/:id", async (req, res) => {
  try {
    const data = await LearnerModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
learnerRoutes.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await LearnerModel.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
learnerRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await LearnerModel.findByIdAndDelete(id);
    res.send(`Deleted record with name ${data.name} from collection`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

learnerRoutes.post("/add", LearnerCtrl.Add);


learnerRoutes.post('/login',(req,res,next) => {
  LearnerModel.find({ email: req.body.email })
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
              expiresIn: "2h"
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token
        });
      }
      res.status(401).json({
        message: "Auth failed"
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
} )

learnerRoutes.post('/addfavourite',Auth,(req,res,next)=>{

})

