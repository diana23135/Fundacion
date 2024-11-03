const validateJWT = function (jwt) {
    return (req, res, next) => { //retorno del servicio
      
    //   if () {
    //     return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    //   }
  
      next();
    };
  }
  
  module.exports = validateJWT;