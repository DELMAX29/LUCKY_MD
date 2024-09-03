const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5rYkxBOG4xTjdKa2Y1TVFHYlJVdFpSUk01MzZ1K0R1OFY1M25jaVFFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXVZNXN0cEdEM243V1hoUzdxL2tpK2QzL21OdGd2ak5vandJeS9XUURDdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXS3NqcUFFSmp3TkxZa3RUUDZzRUpQZXJ2NkxTaWpDREpEa2NSQ2pUMTAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqM3gyM1dzN3pMZ1Q0Wnd3ay9GekdtUWovaXcxYVVnK1BHMEJkZTkxR3ljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFLSVNNU2c3cUt3R2lSeW5kZXVTWDk3ekhUQXJQWkhvSmZTdktkSDQ5MUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1ER2NqcDIrMzJIUlFwakxQbjdFNDFzZHlwQnU2aklET2VnOXJSNHVoR2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUpub3FpSjA1SEpOcHZKRGoyWWtuL05SOUgrVDJIaWplZmNzZjMvMTlIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkdhS0w4TDNISXRwN21NV2c5VWFobnNIWGk1NjltY1M1U2dOai83WU5BVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktoRUJ0YWtBZkw4L05kNXNkZ0dsbWtwZldQYXJLSUtIQUhFWmJUSGFGbFZPdkVoZ09HS1pkSDZWUnhCeU82RVNXbmRrcDdjQW9RaEptUnUvK1JHR0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzUsImFkdlNlY3JldEtleSI6IkpYd0tJT3dVRHZoVi81VktXOEFIb05OZkxnM3ZWcUhhRnF2R2o3aTdYWDg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjBlTzVnbVBwVDRXZWUwMnFjbV9SZUEiLCJwaG9uZUlkIjoiOTJjODAyNGQtMTFhZS00MjEzLThjMWItN2E3YjBmOTRlOWViIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllCT01iSTJaUEZxblRLMlRGRDUwNGZkR3hBTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1alZBUlhDSC9MOWtwci9ZTm1WNno1elFCZzA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRE1ZREM3M1YiLCJtZSI6eyJpZCI6IjI2Mzc4MzAzNzI2Mzo0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNS0FvbU1ReWFIWXRnWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJrcEZRRFhBNGQwTnk2SVhoZ0ZnN1p2U1F4OUwvdlN3aHJKS1EyRmpjalhFPSIsImFjY291bnRTaWduYXR1cmUiOiI4U2VaRXVTTmxtS0JzNlBsVE5kWGVRL0JCK1cvWFlXbWRkQ1VXMTRXd3ZBcll1MFFVeDJiYnNlVktsZnJmai9uMHQ3MHMyZ2xwbGMzaG1vc28rb2pBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQTZ1UHRhcWRsK2dDMkhFRzQreHpsdU9qRE9PeXJYNStYb1hFejJkQlMrQ3ZzdnhYN1FEbWpER1RhNnpaelBSdk1aYVVxcElhZk5ONmZ3TDdIZ016Qnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODMwMzcyNjM6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaS1JVQTF3T0hkRGN1aUY0WUJZTzJiMGtNZlMvNzBzSWF5U2tOaFkzSTF4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1MzA1MDQ2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJZUyJ9',
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
