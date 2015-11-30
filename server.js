var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 5000));


app.use(express.static(__dirname+'/js'));
app.use(express.static(__dirname+'/css'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Machine scheduler web server listening at http://%s:%s', host, port);
});