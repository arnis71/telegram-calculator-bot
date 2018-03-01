var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/new-message', function(req, res) {
  console.log('new message');
  const {message} = req.body

  if (!message || message.text.toLowerCase().indexOf('marco') <0) {
    return res.end()
  }

  axios.post('https://api.telegram.org/bot518559990:AAHp7scR3FUcXYLit3cH8I6YEC3KpNrqfc4/sendMessage', {
    chat_id: message.chat.id,
    text: 'Polo!!'
  })
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});

app.listen(3000, function() {
  console.log('Telegram app listening on port 30001!');
});