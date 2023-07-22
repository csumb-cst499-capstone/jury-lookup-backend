const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkScopes = requiredScopes("read:jurors", "write:jurors");

const jwtCheck = auth({
  audience: "http://localhost:8080",
  issuerBaseURL: "https://dev-so37hggi21mk5iug.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = {
  checkScopes,
  jwtCheck,
};
