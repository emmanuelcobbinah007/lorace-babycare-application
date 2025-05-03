import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string | undefined;

interface User {
    id: string;
    email: string;
    role: string;
}

export const generateAccessToken = (user: User): string => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        JWT_SECRET, 
        { expiresIn: "1h" }
    );
};

export const verifyToken = (token: string) => {
    try {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (
            typeof decoded === "object" &&
            decoded !== null &&
            "id" in decoded &&
            "email" in decoded
          ) {
            return decoded as User;
          }
        throw new Error("Invalid token payload");
      } catch (error) {
        return error; // Invalid token
      }
}