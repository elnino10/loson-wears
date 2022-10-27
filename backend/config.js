/* eslint-disable no-undef */
export default {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://Joe:<password>@cluster0.sq91zd3.mongodb.net/loson-wears?retryWrites=true&w=majority",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "bvegum1970teDozk",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret-for-webToken-secure-authentication",
  NODE_ENV: process.env.NODE_ENV || "development",

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "72h",
  COOKIE_EXPIRES: process.env.COOKIE_EXPIRES || 3,

  SERVER_PORT: process.env.SERVER_PORT || 5000,

  EMAIL_USERNAME: process.env.EMAIL_USERNAME || '510c353245aa90',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '517d620442c8e3',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  EMAIL_PORT: process.env.EMAIL_PORT || 25
};
