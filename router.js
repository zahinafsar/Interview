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
	const accounts = await Account.find();
	console.log(accounts);
	res.json(accounts);
	
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

// const schema = Joi.object({
//     name: Joi.string().min(3).max(60).required(),
//     password: Joi.string().min(6).required(),
//     email: Joi.string().email().required()
// })

// const logschema = Joi.object({
//     password: Joi.string().min(6).required(),
//     email: Joi.string().email().required()
// })

// router.get("/me",auth, async (req,res)=>{
// 	 const account = await Account.findById(res.user._id).select("-password");
// 	 res.render("me",{account});
// })







// router.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.redirect("/log")
// });




// router.get("/register",(req,res)=>{
// 		res.render("register");
// })





// router.get("/log",(req,res)=>{
// 		res.render("log");
// })


// router.post("/delete/:id",auth,async (req,res)=>{
// 	const account = await Account.findOne({_id : res.user._id});
// 	const accountToDelete = await Account.findOne({_id : req.params.id});
// 	if (res.user._id == req.params.id){
// 		await Account.deleteOne({_id: req.params.id})
// 		res.redirect("/logout");
// 	};
// 	if (account.author != "admin") return res.send("you are not admin");
// 	if (accountToDelete.author == ("admin" || "moderator"))  return res.send("cant delete admin");

// 	await Account.deleteOne({_id: req.params.id});
// 	res.redirect("/");
// })


		
module.exports = router;
