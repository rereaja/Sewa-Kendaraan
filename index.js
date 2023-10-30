const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

const pemilik = require("./routes/pemilik")
app.use("/", pemilik)

const penyewa = require("./routes/penyewa")
app.use("/", penyewa)

app.listen(6000,() => {
    console.log("Run port 6000 successfully")
})