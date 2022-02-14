const jwt = require("jsonwebtoken");
const authConfig = require("../controllers/config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //verificando se o token foi informado
  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  //informando que o token deveria ter 2 parter "bearer e hash"
  const parts = authHeader.split(" ");

  // verificando se o token está splitado nas 2 partes
  if (!parts.length === 2)
    return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  //verificando se o scheme tem a palavra bearer
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformated" });
  }

  //
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;
    return next();
  });
};
