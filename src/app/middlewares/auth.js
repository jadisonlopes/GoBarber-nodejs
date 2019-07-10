import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  // split: quebrar string em partes retornando um Arry
  const [, token] = authHeader.split(' ');

  try {
    // promisify: permite que uma função assincrona se torne async/await
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    console.log(decoded);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};
