const mongoose= require('mongoose');
const newrul="mongodb+srv://dhruvlakhotia7:ghchshdh@cluster0.msdhttk.mongodb.net/thaiOCRdata?retryWrites=true&w=majority";

const database= ()=>{
     mongoose.connect(newrul).then(
        ()=>{
        console.log("Database Successfully Connected");
    })
    .catch((err) =>{
        console.log("Erorr while connection");
    })

    

}

module.exports=database;