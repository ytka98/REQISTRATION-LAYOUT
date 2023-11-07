export const apiProtectMiddleWare = (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
    // Это логично - добавить ретёрн
  }
  next();
};
export const signInUserMiddleware = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
    return;
  }
  next();
};
