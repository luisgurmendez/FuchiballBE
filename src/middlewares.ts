
export const jsonRequestFormat = (tokens, req, res) => {
  return JSON.stringify({
    event: 'api-request',
    level: 'INFO',
    'remote-address': tokens['remote-addr'](req, res),
    referrer: tokens.referrer(req, res),
    time: tokens.date(req, res, 'iso'),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens.status(req, res),
    'content-length': tokens.res(req, res, 'content-length'),
    'user-agent': tokens['user-agent'](req, res),
    'response-time-ms': tokens['response-time'](req, res),
  });
};

export const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  console.log('Body: ', JSON.stringify(req.body))
  console.log('Headers: ', JSON.stringify(req.headers))
  next();
};
