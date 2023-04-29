const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const Chat = require('./models/Chat');
const bcrypt = require('bcryptjs');
const app = express();
const apps = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const nodemailer = require('nodemailer');
const http = require('http').createServer(apps)

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
apps.use(express.static(__dirname + '/public'))

mongoose.connect('mongodb://127.0.0.1:27017/Hackathon');

http.listen(3001, () => {
    console.log(`Listening on port 3001`)
});

apps.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

});

app.post('/register', async (req,res) => {
  const {username, email, age, contact, about, github, linkedin, password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      email,
      age, 
      contact,
      about, 
      github,
      linkedin,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
    });
    res.json(postDoc);
  });

});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

app.delete('/post/:id', async (req, res) => {
  const {id} = req.params;
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await Post.deleteOne({_id: id});
    res.json('post deleted successfully');
  });
})


app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

app.get('/developers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.get('/developers/:id', async (req, res) => {
  const {id} = req.params;
  const developer = await User.findById(id);
  res.json(developer);
});

app.post('/chatroom', async (req,res) => {
  const { chat } = req.body;
  try{
    const newChat = await Chat.create({
      chat,
    });
    res.json(newChat);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.get('/chatroom', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/send_email", function(req, response){
  const from = req.body.from;
  const to = req.body.to;
  const subject = req.body.subject;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'shaanagarwal1942003@gmail.com',
          pass: 'jqbvmpykybisaijb'
      }
  });

  const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: message
  }

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log("Email Send: " + info.response)
      }
      response.redirect("/")
  })



});

app.listen(4000);