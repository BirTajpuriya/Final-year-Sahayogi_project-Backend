import experss from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
connectDB();
config({
  path: "./config/config.env",
});
const app = experss();

app.use(experss.json());
app.use(experss.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("working");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port:${process.env.PORT}`);
});

// importing and using routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
export default app;
app.use(ErrorMiddleware);
