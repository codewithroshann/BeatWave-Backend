import jwt from "jsonwebtoken";
const islogedIn = async (req, res, next) =>{
    const token = req.cookies.token;
      if (token == "" || !token) {
      return res.status(400).json({
        isLogedIn: false,
        redirectUrl: "/auth/user/login",
        message: "First Login To Access!",
        type: "error",
      });
    }
    const cookie = jwt.verify(req.cookies.token, "rock444");
  
    next();
  }

  export default islogedIn
