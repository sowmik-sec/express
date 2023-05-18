const protectRoute = (req, res, next) => {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    return res.status(401).json({
      message: "Operation not allowed",
    });
  }
};
module.exports = protectRoute;
