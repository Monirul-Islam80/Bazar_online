const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const dataBaseConnection=()=>{
    mongoose.connect(process.env.DB_URL).then((data)=>{
    console.log('DataBase Connected'+ data.connection.host);
});
}
module.exports =  dataBaseConnection;