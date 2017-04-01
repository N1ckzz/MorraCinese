var express				= require('express');
var port					= process.env.PORT || 3000;
var path          = require('path');

//setup del server express
var app						= express();

//indica al nostro server dove andare a prendere 
app.use(express.static(__dirname + '/public'));

//'*' significa che tutto quello che l'utente scriverà nella barra degli indirizzi la nostra app ritornerà sempre e cmq la index.html
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

//stringa che viene mostrata nel terminale e che ci indica in quale porta locale abbiamo lanciato il nostro server
app.listen(port, function() {
  console.log('Morra Cinese is running on http://localhost:'+ port + '!!!!');
});
