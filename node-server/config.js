import dotenv from 'dotenv';

dotenv.config();

export const config = {
    production: {
        DBurl: process.env.DB_URL,
        Port: process.env.PROD_PORT,
    },
    test: {
        DBurl: process.env.TEST_URL,
        Port: process.env.TEST_PORT,
    },
};