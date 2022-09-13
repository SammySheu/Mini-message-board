var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { title: "Message Board", messages: messages });
});

/* GET new message page. */
router.get("/new", function (req, res, next) {
  res.render("form");
});

/* Post after clicking submit button */
router.post('/new', (req, res, next) => {
  var newMes = req.body;
  messages.push({text: newMes.MessageText, user: newMes.AuthorName, added: new Date()});
  res.redirect('/');
})

module.exports = router;
