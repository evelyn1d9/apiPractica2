const express = require('express')
const routesAuth = require('./src/routes/auth.routes')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/socios/v1/auth', routesAuth);
app.listen(port,()=>{
    console.log("Servidor corriendo en el puerto:",port)
})