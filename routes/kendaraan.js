const express= require("express")
const bodyParser=require("body-parser")
const cors = require("cors")
const db = require("../koneksi")

const app = express.Router()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/kendaraan", (req,res)=>{

    let sql = "select * from kendaraan"

    db.query(sql,(error,result)=>{
        let response = null
        if(error){
            response = {
                message: error.message 
            }
        } else {
            response = {
                kendaraan: result
            }
        }
        res.send(response)
    })
})

app.post("/kendaraan",(req,res)=>{
    let data={
        plat:req.body.plat,
        jenis_kendaraan:req.body.jenis_kendaraan
    }

    let sql = "insert into kendaraan set ?"

   
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

app.put("/kendaraan",(req,res)=>{
    
    let data = [
        
        {
            plat:req.body.plat,
        jenis_kendaraan:req.body.jenis_kendaraan
        },
        
        {
            id_kendaraan: req.body.id_kendaraan
        }
    ]
    
    let sql ="update kendaraan set ? where ?"
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

app.delete("/kendaraan/:id",(req,res)=>{
    let data = {
        id_kendaraan: req.params.id
    }
    
    let sql="delete from kendaraan where?"


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