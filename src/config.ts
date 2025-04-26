import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET as string;