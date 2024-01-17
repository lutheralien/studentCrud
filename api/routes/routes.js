const express = require("express");
const router = express.Router();
var studentModel = require("../src/student/studentModel");

//Add Records
router.post("/student/create", async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.validate(); // Validate the input data

    await student.save();
    res.status(201).json({
      status: true,
      message: "Student Created!",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//View Records
router.get("/students", async (req, res) => {
  try {
    const students = await studentModel.find({});
    res.json(students);
  } catch (error) {
    res.status(400).json(error);
  }
});

//find records

router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const students = await studentModel.findById({ _id });

    if (!students) {
      return res.status(404).json();
    }
    return res.status(200).json(students);
  } catch (error) {
    res.status(400).json(error);
  }
});

//update records
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const updatestudents = await studentModel.findByIdAndUpdate(_id, body, {
      new: true,
    });

    if (!updatestudents) {
      return res.status(404).json();
    }

    res.status(201).json({
      status: true,
      message: "Student updated!",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//delete records
router.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const deletestudents = await studentModel.findByIdAndDelete(_id);

    if (!deletestudents) {
      return res.status(404).json();
    }

    res.status(201).json({
      status: true,
      message: "Student Deleted!",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/students/logout", async (req, res) => {
  try {
    req.student.tokens = req.student.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.student.save();
    res.json();
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
