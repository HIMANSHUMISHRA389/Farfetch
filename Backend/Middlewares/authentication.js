require("dotenv").config();

const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "plz login again" });
  } else {
    jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
      if (err) {
        res.status(401).send({ msg: "plz login again" });
      } else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  }
  // console.log(req.body)

  // if(!req.headers.authorization){
  //     return res.status(401).send({"msg":'plz login again'})
  // }

  // const token=req.headers.authorization.split(" ")[1]
};

module.exports = { authentication };
