import express from "express";
import {
  CreateCourse,
  getAllCourses,
} from "../controllers/courseController.js";
const router = express.Router();

//Get all courses wihout lectures
router.route("/courses").get(getAllCourses);

//Create new course -only admin
router.route("/createcourse").post(CreateCourse);

//Add lecture, delete course, get course details

//Delete lecture

export default router;
