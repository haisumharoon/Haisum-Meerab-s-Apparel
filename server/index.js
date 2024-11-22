const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require('path');
const mysql = require('mysql'); 
const createTables = require("./tables")
const jwt = require("jsonwebtoken")
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
app.get("/user",authorize_token,(req,res)=>{ 
    con.query(`SELECT * FROM user WHERE user_id = "${req.user.id}";`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({user:result[0]})
    });
})
app.get("/categories",(req,res)=>{
    const start = new Date().getTime()
    con.query(`SELECT * FROM customer_category;`, (err, result)=> {
        if(err){
            return res.status(500).json({message:""+err})
        }
         result.forEach((category,index)=>{
             con.query(`SELECT * FROM categories WHERE cc_id = ${category.cc_id};`,  function (err, subCategories) {
                if(err){
                    return res.status(500).json({message:""+err})
                } 
                subCategories.forEach((subCategory,i)=>{
                    con.query(`SELECT * FROM sub_categories WHERE category_id = ${subCategory.category_id};`, function (err, subSubCategories) {
                        if(err){
                            return res.status(500).json({message:""+err})
                        }
                        subCategory.subCategories = subSubCategories
                        if(i == subCategories.length-1 && index == result.length-1){
                            return res.status(200).json({categories:result})
                        }
                    })
                })
                category.subCategories = subCategories
            });
        })  
    });
})
app.post("/customer-categories",authorize_token,(req,res)=>{
    const {name} = req.body 
    con.query(`INSERT INTO customer_category (name) VALUES ("${name}");`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category created successfully"})
    });
})
app.put("/customer-categories/:id",authorize_token,(req,res)=>{
    const {name} = req.body 
    con.query(`UPDATE customer_category SET name = "${name}" WHERE cc_id = ${req.params.id};`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category updated successfully"})
    });
})
app.delete("/customer-categories/:id",authorize_token,(req,res)=>{
    con.query(`DELETE FROM customer_category WHERE cc_id = ${req.params.id};`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category deleted successfully"})
    });
})
app.get("/customer-categories",(req,res)=>{
    con.query(`SELECT * FROM customer_category;`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({categories:result})
    });
})
app.get("/categories",(req,res)=>{
    con.query(`SELECT * FROM categories;`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({categories:result})
    });
})
app.get("/sub-categories",(req,res)=>{
    con.query(`SELECT * FROM sub_categories;`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({categories:result})
    });
})
app.post("/categories",authorize_token,(req,res)=>{
    const {cc_id,name} = req.body 
    con.query(`INSERT INTO categories (cc_id,name) VALUES ("${cc_id}","${name}");`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category created successfully"})
    });
})
app.put("/categories/:id",authorize_token,(req,res)=>{
    const {name} = req.body 
    con.query(`UPDATE categories SET name = "${name}" WHERE category_id = ${req.params.id};`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category updated successfully"})
    });
});
app.delete("/categories/:id",authorize_token,(req,res)=>{
    con.query(`DELETE FROM categories WHERE category_id = ${req.params.id};`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category deleted successfully"})
    });
})
app.post("/sub-categories",authorize_token,(req,res)=>{
    const {category_id,name} = req.body 
    con.query(`INSERT INTO sub_categories (category_id,name) VALUES ("${category_id}","${name}");`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category created successfully"})
    });
}
)
app.put("/sub-categories/:id",authorize_token,(req,res)=>{
    const {name} = req.body 
    con.query(`UPDATE sub_categories SET name = "${name}" WHERE sub_category_id = ${req.params.id};`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category updated successfully"})
    });
}
)
app.delete("/sub-categories/:id",authorize_token,(req,res)=>{
    con.query(`DELETE FROM sub_categories WHERE sub_category_id = ${req.params.id};`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        return res.status(200).json({message:"Category deleted successfully"})
    });
}
)

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

app.post("/login", (req,res)=>{
    const {email,password} = req.body 
    con.query(`SELECT * FROM credentials WHERE email = "${email}" AND password = "${password}";`, function (err, result) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        if(result.length == 0){
            return res.status(401).json({message:"Invalid credentials"})
        }
        con.query(`SELECT * FROM user WHERE credential_id = ${result[0].credential_id};`, function (err, userResult) {
        if(err){
            return res.status(500).json({message:""+err})
        }
        
        const token =  jwt.sign({ sub: 'userId' , id: userResult[0].user_id},process.env.ACCESSTOKEN)
        console.log(token);
        return res.status(200).json({message:"User logged in successfully",token:token})
    }
    );
    });
});

function authorize_token(req,res,next){
    const auth_tkn = req.headers["authorization"]
    const token = auth_tkn?.split(" ")[1];
    if(token == null){
        res.status(401).json({message:"Bad request, no auth"})
    }
    var decoded;
    try{
    decoded = jwt.verify(token,process.env.ACCESSTOKEN);
}catch(e){
    
            return res.status(401).send('unauthorized');
}
    req.user = decoded 
    next()
}