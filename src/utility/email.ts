import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
   secure:true,
   host:'smtp.gmail.com',
   port:465,
   auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
   }
})
