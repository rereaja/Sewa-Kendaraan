const express= require("express")
const bodyParser=require("body-parser")
const cors = require("cors")
const db = require("../koneksi")

const app = express.Router()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/pemilik", (req,res)=>{

    let sql = "select * from pemilik"

    db.query(sql,(error,result)=>{
        let response = null
        if(error){
            response = {
                message: error.message 
            }
        } else {
            response = {
                pemilik: result
            }
        }
        res.send(response)
    })
})

app.post("/pemilik",(req,res)=>{
    let data={
        nama:req.body.nama,
        alamat:req.body.alamat,
        tlp:req.body.tlp
    }

    let sql = "insert into pemilik set ?"

   
    db.query(sql,data,(error,result)=>{
    let response = null
    if(error){
        response={
            message:error.message
        }
    }else{
        response = {
            message: result.affectedRows+"data inserted"
        }
    }
    res.send(response)
 })
})

app.put("/pemilik",(req,res)=>{
    
    let data = [
        
        {
            nama: req.body.nama,
            alamat: req.body.alamat,
            tlp: req.body.tlp,
        },
        
        {
            id_pemilik: req.body.id_pemilik
        }
    ]
    
    let sql ="update pemilik set ? where ?"
    db.query(sql,data,(error,result)=>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else{
            response={
                message: result.affectedRows + "data updated"
            }
        }
        res.send(response)
    })
})

app.delete("/pemilik/:id",(req,res)=>{
    let data = {
        id_pemilik: req.params.id
    }
    
    let sql="delete from pemilik where?"


    db.query(sql,data,(error,result)=>{
        let response = null
        if(error){
            response={
                message:error.message
            }
        }else{
            response = {
                message: result.affectedRows+"data deleted"
            }
        }
        res.send(response)
    })
})

module.exports=app