import * as jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY: secret } = process.env;

type Payload = {
  id: string;
};

if (!secret) {
  throw new Error('Not found jwt secret key');
}

export const generateToken = async (payload: Payload) => {
  try {
    return jwt.sign(payload, secret, {
      issuer: 'hoon',
      expiresIn: '7d',
      subject: 'authToken'
    });
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw error;
  }
};
