const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lta3N1MGdvZGxDQUgwa28zWjArK1FPWHBFSnF0UDJRZE50U0pKWHZWZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXMrTmw5Z0MxSFNzMzJVZUlTc2lWVG93dzRUem5UNitmdWZhUnZ0Zm0wRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQ25mOHVHK2Q2UWN5ZHFDOVBCN3lJanNrc1N1Q3MxRVQycllDQUNqMTNRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNalRPRFY0NTVSTzVrM0JiNzMrZ1lUYVFrVUxQRVNZSHhBbmlEUytpQTNnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFLQlpLTHRnM2hyVEYvNEtnVlJqTlRIWlRvTTJuZDVqSnQ0ck5lVkFBbjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjA4aXRGcW55WFBBeEMvNXBVMWxCLzNiNU55SVdyenJGaWVIWTZjQllrM2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUxnVXNKNVhmeThSczc2ZW5ROW1iNW9TSmpIdHZSOXk1RzA4YlV1ZUdVUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDNIUXBEYlkwNkdNNTVVVWVqZ0oyNEdqUm5EK1dSZWpncUNTTUV5ODNtMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx3cUU0bDFCbGVacEpvaVZSV2YyL1B6eUlJSmNoQ1NnZ3dyWkJBVmZ3bU4xVTZmSUJ0NDVpWWQ3azBjYnhka2FCMUthU3VkeENZcWF1M2w0NVM4M0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ5LCJhZHZTZWNyZXRLZXkiOiJ5TnNyblAwZFllcEZ3Y1RTc004REhiblJtZnc5TFMrbUM4WEJDVy90L2FrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzR2E0dkpneFFJLVUwMklyM2ZQS3B3IiwicGhvbmVJZCI6IjNmOTBjOTZlLTM5MzAtNDU4Mi05MzkyLWVhYWE1YTlhYjQ1NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDZ3NzUUFrZjNWTEtsLzRyVWNnSUtlTGI3bWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSGtFbk9LeENaaGE0REZQRy95RlNEREM3UU5JPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJKWFZEMjczIiwibWUiOnsiaWQiOiIyNjM3MTY0MDEwNjA6ODVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTGVvbWFuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPR2dxZllHRUk2cTJMWUdHQkVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJVWU9QOHliRlhidWl1MUxIMUl3bHZtdHVTVVplWEV2NEsxV1JydmFQYUY4PSIsImFjY291bnRTaWduYXR1cmUiOiJxb083MDVCS1lsOGNpbExqN1Z5WlJ5czd2L0ZuekxySUEyaER1Y2hzbnBUQmdZUTdLOUFLaTBOOVIwVGlPbklwd0V1WUNDUThkVWZCT0JhK0RDU3BDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUitSQUdCMGVrY0NVejEvVWUwQVBuNnZ0K0Q5TnF0T0wrTXhSN1NFcE9jN0VjVWk0QnQzTlZCT0J4RU9jMy9zcnloN1hWaDBNanNDSDZLU283OEMvQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTY0MDEwNjA6ODVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVkdEai9NbXhWMjdvcnRTeDlTTUpiNXJia2xHWGx4TCtDdFZrYTcyajJoZiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTMwNjEzOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBaGcifQ==',
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
