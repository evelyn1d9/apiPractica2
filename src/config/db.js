const mongoose = require('mongoose')
const uriRemota = "mongodb+srv://iamevelynherrera:Matthew07@cluster0.o7ebusq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uriRemota)
const db = mongoose.connection
module.exports = mongoose;