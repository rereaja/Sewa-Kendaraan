const express= require("express")
const bodyParser=require("body-parser")
const cors = require("cors")
const db = require("../koneksi")

const app = express.Router()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/penyewa", (req,res)=>{

    let sql = "select * from penyewa"

    db.query(sql,(error,result)=>{
        let response = null
        if(error){
            response = {
                message: error.message 
            }
        } else {
            response = {
                penyewa: result
            }
        }
        res.send(response)
    })
})

app.post("/penyewa",(req,res)=>{
    let data={
        nama:req.body.nama,
        alamat:req.body.alamat,
        tlp:req.body.tlp,
        kendaraan:req.body.kendaraan
    }

    let sql = "insert into penyewa set ?"

   
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

app.put("/penyewa",(req,res)=>{
    
    let data = [
        
        {
            nama: req.body.nama,
            alamat: req.body.alamat,
            tlp: req.body.tlp,
            kendaraan: req.body.kendaraan
        },
        
        {
            id_penyewa: req.body.id_penyewa
        }
    ]
    
    let sql ="update penyewa set ? where ?"
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

app.delete("/penyewa/:id",(req,res)=>{
    let data = {
        id_penyewa: req.params.id
    }
    
    let sql="delete from penyewa where?"


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