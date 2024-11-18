const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require('path');
const mysql = require('mysql'); 
const createTables = require("./tables")
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({storage:storage})
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
var con = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD
});

con.connect(function(err) {
    if (err) throw err; 
  console.log("Connected!");
  createTables(con);
});
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).json({ message: 'Image not found' });
            } else {
                console.error('Error sending file:', err);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    });
});
app.get("/category",(req, res) => {
    return res.status(200).json({message:"This is the categories route"})
});
app.post("/register",(req,res)=>{
    const {name,username,email,password} = req.body 
    con.query(`INSERT INTO credentials (username,email,password) VALUES ("${username}","${email}","${password}");`, function (err, result) {
         
        if(err){
            return res.status(500).json({message:""+err})
        }
        con.query(`INSERT INTO user (name,credential_id) VALUES ("${name}","${result.insertId}");`, function (err, userResult) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        console.log("1 record inserted");
        return res.status(200).json({message:"User registered successfully"})
    });
    });
    
})