const exp = require('express');
const router = exp.Router()
const Account = require('./userModel');
const University = require('./listModel');
const bcrypt = require('bcrypt');
require('dotenv').config();




router.get('/universities', async (req, res) => {
    try {
        let universities;
        if (req.query.search) {
            let re = new RegExp('.*' + req.query.search + '.*', 'i');
            universities = await University.find({ name: { $regex: re } });
        } else {
            universities = await University.find();
        }
        res.json(universities);
    } catch (error) {
        res.json(error._message);
    }
});

router.get('/universities/:id', async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        res.json(university);
    } catch (error) {
        res.json(error._message);
    }
});

router.delete('/universities/:id', async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);
        res.json(university);
    } catch (error) {
        res.json(error._message);
    }
});

router.post('/universities', async (req, res) => {
    const university = new University(req.body);
    try {
        const result = await university.save();
        res.json(result);
    } catch (error) {
        res.json(error._message);
    }
});


router.post("/logup",(req,res)=>{
	bcrypt.hash( req.body.password , 5 ,async(err, hash)=>{
		const account  = new Account({
			email : req.body.email,
	    	password : hash
		})
		const r = await account.save();
		if (r){res.send("200")};
		if (!r){res.send("404")}
	})
})


router.get("/", async (req,res)=>{
	const account = await Account.find();
	console.log(account);
        res.send(account); 
	
})



router.post("/signin", async(req,res)=>{
	console.log("signin.........")
	const account = await Account.findOne({email : req.body.email});
	const valid = await bcrypt.compare(req.body.password,account.password);
	if (valid){res.send("200")};
	if (!valid){res.send("404")}
})




router.post("/edit/:id", async (req,res)=>{
		await Account.updateOne({_id : req.params.id},{
			$set:{
				name: req.body.name,
			},
		new: true
	}
)
})
	
module.exports = router;
