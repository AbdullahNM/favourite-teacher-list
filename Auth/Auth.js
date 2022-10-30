const jwt = require('jsonwebtoken')

const Auth = (req, res,next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
      const token = req.headers.token;
      const verified = jwt.verify(token, jwtSecretKey);
        //res.send("Successfully Verified");
        console.log('Successfully Verified');
        req.userdata = verified;
        next();
    } catch (error) {
      // Access Denied
      return res.status(401).json({message: error.message});
    }
  };

  module.exports = Auth