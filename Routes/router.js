const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


router.post("/create", (req, res) => {
    // console.log(req.body);
    const { name, email, age, mobile, work, add, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        res.status(422).json("please fill all data")
    }
    try {

        conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("please data is already exist")
            } else {
                conn.query("INSERT INTO users SET ?", { name, email, age, mobile, work, add, desc }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })

    } catch (error) {
        res.status(422).json(error)
    }

});

router.get("/getusers",(req,res)=>{

    conn.query("SELECT * FROM users",(err,result)=>{
        if(err){
            res.status(422).json("no data available");
        }else{
            res.status(201).json(result);
        }
    })
});

module.exports = router;