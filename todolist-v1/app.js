const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["buy bread"];
let workItems = [];
app.get("/", function(req, res){

	
	let day = date.getDate();
	res.render("list", {listTitle: day, newListItem: items});

});

app.post("/", function(req, res){
	let listItem = req.body.listItem;
	if(req.body.list === "Work"){
		workItems.push(listItem);
		res.redirect("/work")
	}else{
		items.push(listItem);
		res.redirect("/")
	}
	

	
})

app.get("/work", function(req, res){
	res.render("list", {listTitle: "Work List", newListItem: workItems })
})

app.post("/work", function(req, res){
	let listItem = req.body.listItem;
	workItems.push(listItem);
	res.redirect("/work");
})

app.get("/about", function (req, res) {
	res.render("about");
})

app.listen(3000, function() {
	console.log("app is running on port 3000");
});