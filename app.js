import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

//Config files
import connectDB from "./Configs/dataBase.js";
import cloudinaryConfig from "./Configs/cloudinary.config.js";
//folders inside the project
import SignupRouter from "./Routers/AuthRouters/Signup.Router.js";
import LoginRouter from "./Routers/AuthRouters/Login.Router.js";
import LogoutRouter from "./Routers/AuthRouters/Logout.Router.js";
import AddToCartRouter from "./Routers/Cart/AddToCart.Router.js";
import CartRouter from "./Routers/Cart/Cart.Router.js";
import RemoveFromCart from "./Routers/Cart/RemoveFromCart.Router.js";
import UserAuthtentication from "./Routers/AuthRouters/UserAuth.Router.js";
import UpdateProfile from "./Routers/AuthRouters/UpdateProfile.Router.js";
import BeatsUploads from "./Routers/Beats/BeatsUploads.Router.js";
import ViewBeatRouter from "./Routers/Beats/ViewBeat.Router.js";
import FetchBeats from "./Routers/Beats/FetchBeats.Router.js";
import RelesedBeats from "./Routers/AdminPanel/ReleseBeats.js";
import GetSearchBeat from "./Routers/Explore/GetSearchBeat.js";
import FilterBeats from "./Routers/Explore/FilterBeats.js";
import GetAdminBeats from "./Routers/AdminPanel/GetAdminBeats.js";
import DeleteAdminBeat from "./Routers/AdminPanel/DeleteAdminBeat.js";
import UpdateBeat from "./Routers/AdminPanel/UpdateBeat.js";
import GetCategoryBeats from "./Routers/Beats/GetCategoryBeats.js"
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Match frontend
    credentials: true,
  })
);

const port =process.env.PORT || 8000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//HOME
app.get("/", (req, res) => {
  res.send("BeatWave Backend");
});


//Signup form handle route
app.use("/auth", SignupRouter);

//Login form handle route
app.use("/auth", LoginRouter);

//USER LOGOUT ROUTE
app.use("/user", LogoutRouter);

//checking user is loged in or not
app.use(UserAuthtentication);

//UPDATE USER
app.use(UpdateProfile);

// Beat Uploads Route
app.use(BeatsUploads);

//  BEAT VIEW ROUTE
app.use("/beat", ViewBeatRouter);

//GETTING ALL BEATS ROUTE
app.use(FetchBeats);

//ADDTOCART ROUTE
app.use("/addtocart", AddToCartRouter);
//CART ROUTE
app.use(CartRouter);
//REMOVE FROM CART
app.use("/removefromcart", RemoveFromCart);

// ADMIN ALL RELESED BEATS
app.use("/relese", RelesedBeats);

//GET SEARCH BEATS
app.use("/get", GetSearchBeat);
//Filter Beats
app.use("/filter", FilterBeats);

//GET CATEGORY BEATS
app.use("/explore", GetCategoryBeats)

//GET ADMIN PANNEL BEAT FOR CRUD
app.use("/admin", GetAdminBeats);
app.use("/admin", DeleteAdminBeat);
app.use("/admin", UpdateBeat);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
