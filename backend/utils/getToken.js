import jwt from "jsonwebtoken";
import config from "../config.js";

const getToken = (id) => {
  jwt.sign(id, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  }); 
};

export default getToken;


// export const isAuth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     const onlyToken = token.slice(7, token.length);
//     jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({ msg: "Invalid Token" });
//       }
//       req.user = token;
//       next();
//       return;
//     });
//   }
//   return res.status(401).send({ msg: "Token not found" });
// };