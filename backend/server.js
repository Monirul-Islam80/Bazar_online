const app = require('./app');
const dataBaseConnection = require('./config/database');
const cloudinary = require('cloudinary')
// Handling Unchaught Exception
process.on('uncaughtException', err=>{
    console.log(err.message);
    console.log('Shutting down the server due to Unchaught Exception');
    process.exit(1);
})




if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path:"backend/config/config.env"});
}

dataBaseConnection()


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`);
})
// unhandled promies rejection

process.on('unhandledRejection', err=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled Promise Rejections');

    server.close(()=>{
        process.exit(1);
    });
});