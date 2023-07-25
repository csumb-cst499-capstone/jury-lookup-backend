const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkScopes = requiredScopes("read:jurors", "write:jurors");

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

module.exports = {
  checkScopes,
  jwtCheck,
};
