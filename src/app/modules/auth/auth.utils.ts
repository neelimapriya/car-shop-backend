import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = async (
    jwtPayload: { email: string; role: string },
    secret: string,
    expiresIn: string |number,
) => {
    const token = jwt.sign(jwtPayload , secret as string, {expiresIn} as SignOptions);
    return token;
};


export const verifyToken = async (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
  };