const entryLogger = (req, res, next) => {
  console.log('Time: ', Date.now());
  console.log('Body: ', JSON.stringify(req.body))
  console.log('Headers: ', JSON.stringify(req.headers))
  next();
};

export default entryLogger;
