import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cookieParser from "cookie-parser";
  
import AppError from "./utils/appError.js";
 
import errorHandler from "./controllers/errorController.js";
  
const app = express();

app.use(helmet());
app.use(express.json({ limit: "15kb" }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

// Test middleware
// app.use((req, res, next)=>{
//   console.log(req.cookies);
//   next()
// })

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.all("*", (req, res, next) => {
  // eslint-disable-next-line new-cap
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
