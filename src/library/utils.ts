import * as crypto from 'crypto';

const { PASSWORD_ENCRYPT_KEY } = process.env;

if (!PASSWORD_ENCRYPT_KEY) {
  throw new Error('Not found password encrypt key');
}

export const encryptPassword = (plainText: string): string => {
  const hash = crypto
    .createHmac('sha512', PASSWORD_ENCRYPT_KEY)
    .update(plainText)
    .digest('hex');

  return hash;
};
