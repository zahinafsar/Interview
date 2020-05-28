const exp = require('express');
const router = require('./router');
const app = exp();
const mlab = require('mongoose');
require('dotenv').config();

app.use(exp.json());
app.use(exp.urlencoded({extended : false}));
app.use("/",router);


mlab.connect(`${process.env.MLAB}`,
	{useNewUrlParser: true,useUnifiedTopology: true},
	()=>console.log("connected with DB"));

const port = process.env.PORT || 5000;
app.listen(port,()=>{
	console.log(port)
});