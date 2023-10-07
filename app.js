import experss from "express";

import { config } from "dotenv";

config({
  path: "./config/config.env",
});
const app = experss();
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port:${process.env.PORT}`);
});
// importing and using routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
export default app;
