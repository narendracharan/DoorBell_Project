require("dotenv").config()
const express=require("express")
const morgan=require("morgan")
const bodyParser=require("body-parser")
const app=express()
require("./config/connection")
app.use(bodyParser.json())
app.use(morgan("dev"))
const adminRouter=require("./router/adminRouter")

app.use("/admin",adminRouter)

app.listen(5000,()=>{
    console.log(`Server is running port no:5000`);
})