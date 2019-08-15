const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    // if no Authorization header set, throw error
    if (!req.get(('Authorization'))){
        console.log("Error authenticating user.")
        throw new Error("Error authenticating user.");
    }
    //check if token is valid and throw error if not
    const token = req.get('Authorization').split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (decoded){
            res.locals.user_id = decoded.user_id;
            next();
        } else {
            console.log("Error authenticating user.")
            throw new Error("Error authenticating user.");
        }

      });
}