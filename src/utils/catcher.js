export default (cb) => (req, res, next) => {
  Promise.resolve(cb(req, res)).catch((err) => next(err));
};
