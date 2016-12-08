const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear', ()=>
{
	return new Date().getFullYear();
});
app.use(express.static(__dirname + '/public'));
app.set('viewengine','hbs');

app.use((req,res,next) =>
{
	var date = new Date().toString();
	var log = `${date} : ${req.method} ${req.url}`; 
	fs.appendFile('logfile.log', log+'\n',(err) =>
	{
		if(err)
			console.log('Unable to load file');
	});
	next();
})

//app.use((req,res,next) =>
//{
	//res.render('maintainence.hbs');
	//next();
//})

app.get('/',(req,res) =>{
	res.render('home.hbs',{
		pageTitle :'Home page',
	});
});

app.get('/about',(req,res) =>{
	res.render('about.hbs',{
		pageTitle :'About page',
	});
});

app.get('/bad',(req,res) =>{
	res.send({
		errormessage:'We can;t load this page at this moment. Sorry!!!'
	});
});

app.listen(3000,()=>{
	console.log('Server is on port 3000');
});