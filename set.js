const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0xXVUhxZTBWbHVqL0lnS0xQbkxZMlR3T1pCZnhOaXA5RExvenV2dFlGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3lSVUZtdTVVZmFtdytQaGlPbytRckhCd2VXbCt1Nkl1clRtNEdUQ3hoYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQjVNSXNmcTVUa2ZrMUFWQnMxdlZ4eHlMOWNoMWd4WXQ3MDZjNjlmeDJrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtN0RHNitleU1wbzlrdG9HUHdSUHVpbStJS054bFdWVkowS2pYbU5aM1I4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNeFdFZ2ttN0FRTnZBOXhhSG9uN2piTGZEZG9iS21zWWhuQkU2bmxaRXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJsd0t0L2FXSnB1dVdKOWZBSHhnRUErb29pMkpiKzRFdEtHblNVcWtPbEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVB6ekxPbXZ3K0g3ZnNldEZvck1lWVBIYkZIUWJVc3JLV0x6QWowNXJVND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia25zNmhhM0gxUjd3RzJqZjA3ZGJOYmMvaW96L3k0Lzd4bGhsQ3Bid2MyMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFNUkVlUnI3Sll4V1NxUHgxTUpDSzNmaDZrL1BaTDR0RU5VbUZYcVJqNTgyZDBTdW9rYUkxL2lYZVYwUFkxcEVRYy9VRXh2bVRjMjVKeGp0SUk5bUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg4LCJhZHZTZWNyZXRLZXkiOiI1cVdiaEhIaTJtMDhvL2dHaWp4d0tWdEVHZnZ4UWw3VGdsY1NubTJja2I0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMywiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZTEhYU1JoR1RCMld6ME0zUUtRUS13IiwicGhvbmVJZCI6IjcwMmYyZmRjLTA3ZmEtNDZkZC1iOGJhLWMzNzU1NWUzNGJlNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRYURUdzZLeGZQaDVMMjVvTmdxbmVtd1ROSlk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjF1SU4rRU5yMGdpeVpWUThBMDl2ZTRVYnFJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkY1U1pSSFZGIiwibWUiOnsiaWQiOiIyNjM3MTc2NzIwNjg6NTZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSzI5cHJvbWF4In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMYkowL29ERUt2THdiWUdHQTBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtOHA3Z1JtSm9BUThHL1FNai9kWlRLcm1lbFJGRkNIdXJyclNYWmtRbjE4PSIsImFjY291bnRTaWduYXR1cmUiOiI4K2VCZFJwZUFmUUZ3ejJXM3d4RXFVYnhPVkJjcGs4dmlxbzR5SWNYdDI5d2VmNUV5ZkQwNXhvbm9oMFJRNHFjVFU1ZHl2OXZISTVydnFTbkhQWDhBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMDBMTnA2a0czaW9SMnROYXptMVJ3NjhlYmlmcVJrVmFnSjVEMFRZMFBzdklwSlBhK3NqL1phdlN4aHEydmxEd2F5Yi9KUld3VkZsWjdDcjQrVWJhQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTc2NzIwNjg6NTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWnZLZTRFWmlhQUVQQnYwREkvM1dVeXE1bnBVUlJRaDdxNjYwbDJaRUo5ZiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDkzMzU2MH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "k29promax",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263717672068,263787382852",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'LUCKY MD V5',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/60cd0a18bda777a41ffe3.jpg,https://telegra.ph/file/bc9bf76f258c98877d993.jpg,https://telegra.ph/file/f6c60977ceb194e05e616.jpg,https://telegra.ph/file/74d7f0176b4e779dea4fd.jpg,https://telegra.ph/file/d04abf5e17b331ab46871.jpg,https://telegra.ph/file/2ab35f2759d081657d286.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
