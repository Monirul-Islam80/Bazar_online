const nodeMailer = require('nodemailer');
const path = require('path');
const sendMail = async (option) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    // path: path.resolve(__dirname,'../views/main.html') 
    const mailOpetions = {
        from: process.env.SMPT_MAIL,
        to: option.email,
        subject: option.subject,

        html:
            ` <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href = "https://fonts.googleapis.com/icon?family=Material+Icons" rel = "stylesheet">
                <title>Email</title>
            </head>
            <style>
            tbody{
                display: flex;
            }
            @media screen and (min-width: 500px) {
                tbody{
                display: flex;
                flex-direction: column;
            }
            }
            </style>
            <body style="box-sizing: border-box; background-image: url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80');  background-color:black; background-size: cover; background-position: center;  width:100%; height:100vh;">
            <div style="margin-bottom: 20px; color:white; padding:10px; z-index:1000;">
            ${option.message}</div>
            <table border="0" style="background-color: skyblue; padding: 20px; width: 100%; height: 40vh;">
                <tbody >
                    <tr style=" height:30vh; width:50%; ">
                        <td style="font-family: sans-serif; background-color: white; width: 25%; text-align: center; border-right: 4px solid red;">
                            <h1>Monirul Islam Soumik</h1>
                            <h2>Web-developer</h2>
                        </td>
                        <td style="padding-left: 10px; width:50%;">
                            <h3><a href="tel:+8801980404942"  style="text-decoration: none; color: white;">  +8801980404942</a></h3>
                            <h3><a href="mailto:monirulislam49007@gmil.com"  style="text-decoration: none; color: white;">  monirulislam49007@gmail.com</a> </h3>
                            <h3><span style="color: white;">  Buddimontopur, MoulviBazar, Bangladesh</span></h3>
                           
            
                        </td>
                    </tr>
                </tbody>
            </table>
            </body>
            
            </html>`
        ,

        defaultLayout: false

    }
    await transporter.sendMail(mailOpetions);

}

module.exports = sendMail;