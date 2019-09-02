//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;


const db = require('./queries')
const ejsLint = require('ejs-lint');

var cors = require('cors');
app.use(cors());
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true,}))


//functions calling

app.get('/list',db.getUsers) //works
app.get('/list/:id', db.getUserById) //works
app.post('/list', db.createUser)//works
app.put('/list/:id', db.updateUser)//works
app.delete('/list/:id', db.deleteUser)

//home route
app.get('/',(request,response) => {
	response.json({
	info: 'Node.js, Express, and Postgres API'
	
})

app.post("/", function(req,res){
	const item = req.body.todoItem;
	if(req.body.list === "Work"){
		workItems.push(item);
		res.redirect('/work');
	} else{
	const item = req.body.todoItem;
	items.push(item);
	res.redirect("/");
	}


});

app.post("/delete", function(req,res){

	const item = req.body.todoItem;
	if(req.body.list === "Work"){
		workItems.pop(item);
		res.redirect('/work');
	} else{
	const item = req.body.todoItem;
	items.pop(item);
	res.redirect("/");
		
	}

});


})

app.listen(port,()=> {

	console.log(`App running on port ${port}.`)
})

//HOMEPAGE
//http://localhost:3333


//HOMEPAGE with users
//http://localhost:3333/users

//POST
//curl --data "name=Elaine&email=elaine@example.com" 
// http:localhost:3333/users


//PUT
//curl -X PUT -d "name=Kramer" -d "email=kramer@example.com"
//http://localhost:3333/users/2

//DELETE
//curl -X "DELETE" http://localhost:3000/users/1