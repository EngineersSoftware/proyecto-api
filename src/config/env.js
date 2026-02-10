import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    appName: process.env.APP_NAME || 'NodeApp',
}