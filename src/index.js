const express = require("express");
const { PORT } = require("./config");
const apiRouter = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRouter);


app.listen(PORT,() => {
    console.log(`server successfully running on ${PORT}`);
    
})