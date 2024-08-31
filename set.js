const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUZNOVM1VFRNNmNrQUNSc3g2bS9naVM0SGQ2N1c5YmtBNU5scS9ZbjhFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejF6elAwWDdUWmZwZlUzbW9UOS8vbzgrOXFTNEMxQ0hHSlI0cjN2ckEzbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSGpTMUtvblJhdGRGamthdkhYc2t2WVBBMnlzNE5vQ3hDODVKV2RTU0ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMUdFNDUvT0FJMm91eDg5MkhBdFIzTmJzT1NsQkVDY2hXTk5STHNCYmpFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1LTmwwczdUU3dKRG5QenhwRkFTS1pUTW11cHNCektmZy96SGYxN0VSbDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQ4YU9zdXdCYkV3K0ZJU0FNcFo0Wm42OFpDTWRPcFBlbys2ZFB1LzF3VHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNklGakUyRERnK3h0Q1YxdW1XK2Q3eWpHdUQxcXBuR05CbWY5d3lzQTFYVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDlXMmFVNDhucDMxVzQvQjhYQmVwRE80cTlSc3dHMmN0MXBveTlrVmozaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJHYUVwVEFwd3hMU3FidWdFV1RwaWN6YUhjWHdSTGNvaW9zb01oY09zb0dxWE1idTN3ZHVQOWh2ekJMd2ZFUXRERFZpalhYUm5Bc3NWWHhhVEhKUkJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJPdk9iejNIMHpUc1p2RTJDY1dNeUVUY1YvWUFkZTcvUStONUNmaDFwOWxNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJkRUx0SUcwOVROMmZ3eERpcVRkTU1BIiwicGhvbmVJZCI6IjVhMDJhZmI3LTkyMWQtNDY0Ny1iYWE3LTIxZDdiY2NmNTgwOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwUkQxTDhDY05yL1UybmhleFd1a25mRmFGb2s9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzVIZTVCUGNDbkthaGNhaGVIQVlDMEFoaHA4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNIN0M0R0pIIiwibWUiOnsiaWQiOiIyNjM3ODczODI4NTI6MzRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSzI5cHJvbWF4In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJZnA4dk1GRUp2V2piWUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZK2JoYytGZHhpdFRyK0ltVURRM3NDQmhONllSL2tUaUxUdVg5TlBZYVQwPSIsImFjY291bnRTaWduYXR1cmUiOiJET3VUTEw3dzhsZVRSOU9PY3BZYzJqK3pwZThjTWIyeHpaY2d1OGo4VGs5ZkRSZzRzeXFVUDBZWERKb0RVVXVxVGVjNlU4YW9RVlJ3a3ZPOXRkaERCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoib29laDcwVWhYcS9rK05YV3hnNk02S2xNdVFMMjlkZnNhdGFUeERKMHZ5dHU2SUtzRUN6U0x2ZDE2UnVMWE5oV3dLc1ozL3lNVEhnekpRWGg3VUE3REE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODczODI4NTI6MzRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1BtNFhQaFhjWXJVNi9pSmxBME43QWdZVGVtRWY1RTRpMDdsL1RUMkdrOSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDA4Mjk4NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCa1gifQ==',
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
