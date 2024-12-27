import mongoose from "mongoose";
import { Course } from "./db/index.js"; // Your schema models
import {configDotenv} from 'dotenv'
configDotenv()
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateCoursesWithImages = async () => {
  try {
    // Define the mapping of courses to their image paths
    const courseImageMap = {
      "Mern stack developement": "http://localhost:3000/uploads/mern.png",
      "Good habits": "http://localhost:3000/uploads/habit.png",
      "Mastering Python Programming": "http://localhost:3000/uploads/python.png",
      "Web Development Bootcamp": "http://localhost:3000/uploads/web.png",
      "Data Science with R": "http://localhost:3000/uploads/data.png",
      "Introduction to Machine Learning": "http://localhost:3000/uploads/machine.png",
      "Graphic Design for Beginners": "http://localhost:3000/uploads/graphic.png",
      "Learn Human Physciology": "http://localhost:3000/uploads/human.png",
      // Add more course-title-to-image mappings here
    };

    // Iterate through the courseImageMap and update each course
    for (const [title, imageUrl] of Object.entries(courseImageMap)) {
      await Course.updateOne({ title }, { $set: { imageUrl } });
    }

    console.log("Courses updated successfully with image URLs.");
  } catch (err) {
    console.error("Error updating courses:", err);
  } finally {
    mongoose.connection.close();
  }
};

updateCoursesWithImages();
