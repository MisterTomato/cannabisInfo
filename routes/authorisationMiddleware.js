module.exports = options => (req, res, next) => {
  debugger;
  const redirectUrl = options ? options : "/";
  if (req.session.passport) next();
  else res.redirect(redirectUrl);
};
