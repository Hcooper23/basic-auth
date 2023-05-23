const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const credentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf8');
  const [username, password] = decodedCredentials.split(':');

  const isValidCredentials = validateCredentials(username, password);
  if (!isValidCredentials) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = fetchUser(username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  req.user = user;

  next();
};

const validateCredentials = (username, password) => {
  return username === 'admin' && password === 'password';
};

const fetchUser = (username) => {
  return { username };
};

module.exports = basicAuth;