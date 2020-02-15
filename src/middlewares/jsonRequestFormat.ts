const jsonRequestFormat = (tokens, req, res) => {
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

export default jsonRequestFormat;