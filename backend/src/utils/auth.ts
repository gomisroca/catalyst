import { User } from "@prisma/client";
const jwt = require("jsonwebtoken");

export function verifyUser(authorization: string): User | null{
    const token = authorization.split(' ')[1];
    try {
        const user: User = jwt.verify(token, process.env.JWT_SECRET);
        return user;
    } catch (error) {
        return null; // Token verification failed
    }
}