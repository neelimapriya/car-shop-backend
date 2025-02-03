import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = async (
    jwtPayload: { email: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    const token = jwt.sign(jwtPayload, secret as string, {
        expiresIn: expiresIn,
    });
   

    return token;
};


export const verifyToken = async (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
  };