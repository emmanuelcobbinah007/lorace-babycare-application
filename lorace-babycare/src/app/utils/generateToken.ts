import crypto from 'crypto';

const generateToken = (length: number): string => {
    return crypto.randomBytes(length).toString('hex');
    }

export default generateToken;