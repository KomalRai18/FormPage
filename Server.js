import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log("database connected");
  }
  const userdata = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    gender: String,
    suffix: String,
    password: String
  });
  const User = mongoose.model('User', userdata);
const app = express();

// app.use((req, res, next)=>{
//     res.setHeader(
//         'Content-Security-Policy',
//         "default-src 'self' https://cdn.jsdelivr.net; script-src 'self' https://cdn.jsdelivr.net"
//         );
//         next();
//     });
    
app.use(cors());
app.use(express.json());
app.use(helmet());

app.post('/api', async (req, res)=>{
    let user = new User();
    user.fname = "KOMAL"
    user.lname = "req.body.lname"
    user.email = "req.body.email"
    user.password = "req.body.password"
    user.phone = "req.body.phone"
    user.gender = "req.body.gender"
    user.suffix = "req.body.suffix"
    const doc = await user.save();
    console.log(doc)

    res.send('data is recieved')
    res.json(req.body);
});
app.get('/test', async(req, res)=>{
    const docs = await User.find({});
    res.json(docs)
})
app.listen(8080, ()=>{
    console.log("Server has started")
});
