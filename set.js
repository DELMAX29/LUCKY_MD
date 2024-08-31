const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || ''eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMENxelJxMnJ6ZFlVUFZsOHc4azJHakdic1o0amFsVHJpT1dMQVRqekowZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkp5ME1wSWpSK3ZINUZUS21LUTRuUGl5R2tRTnViemhxd21BYTRCSXFRQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRExxVUt3ckViMTlyejhvMzlzQXluMU9xMVozZTVtZCtKRkIvaTNMcFVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZ0RCYlY0c2pCUUxJYys1WnJWRERlYW9zMy9yU2hSVnRmZGozVEhmeWxVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRPY1Y3K1hVNlQyVndhTmtYaTlFQTNUc2ptWlJpTU4zcXBBNG5EaVlzWGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZaL2RMT1A3UmZYQitqR1BmaTQ1b0kwblJyckR2c1RKTEVYU0kvazRHaGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0NRSlpQcDZUMnVrYVZvaDQxd2JMNlBzL1doTC91ckRGR0F4MlJEa2ptMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidm9UTndaK3hQSHEvTFo4L3VRNitRalpYeEhXbVZsQXc3Rk1sWEVlNFRVbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZobDNPSlVWb01CdWhJZTQ5TFpxOHRqL1lUeWFxWktCWHhpdDZNcEQrS3B6ZkVDVmpMWUk4Z0k1TVFEVG9STElxSkVtWXhPUUNiN0prcERVcUtWZ2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiIyYmtmcVg0Z1BNTW5hRXBrS1V4Uk8xY01udTN1aUJmUjFobTh4M2JQSXhvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2SmNkMlNIRFNkYUY1NjVBQ1RUX0p3IiwicGhvbmVJZCI6ImQ3NTE3ZGYzLTRjMmYtNGM2Yi1hMGVlLWE1MDRmNDJiMGMxNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQM2pmaHRCa1NYUHZYdnU3V1UzMFE1dllwZmc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXVDaW9YUGRleFJNUWNXUE50Wkt5R1RsTUZ3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRINVpWR0pXIiwibWUiOnsiaWQiOiIyNjM3MTc2NzIwNjg6NjVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xiSjAvb0RFSys2enJZR0dCa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im04cDdnUm1Kb0FROEcvUU1qL2RaVEtybWVsUkZGQ0h1cnJyU1haa1FuMTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJtVkRDWkplN0MrRmdMNVQwZExSd3V5clZHa2tZLzRzOU5hQmppN2dNYlk4MzFXVU1WdVZLL2NZZDdMWHVOQisraVU2NmVQTG56eXhwcklnZzFmTEF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJHNnJiYU9LQ0t3WVd1aUNXVE9ubDR0WHExRTdyemhaRllTMUdKQlZpYUJ0SHVoZlR3V09YNG1USFNFZFdndS9uR0ZRNTRLSlp0MUFmY1k1TlI2R21qdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNzY3MjA2ODo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJadktlNEVaaWFBRVBCdjBESS8zV1V5cTVucFVSUlFoN3E2NjBsMlpFSjlmIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1MTQ0MzgwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU4wViJ9,
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
