var express = require('express');
var router = express.Router();
var fs = require("fs");
var ejs = require("ejs");
var armies;

fs.readFile("models/armies.json", "utf8", function(err, data) {
  if (err) throw err;
  armies = JSON.parse(data).armies;
  armies.sort(function(a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { armies: armies, army: armies[0]});
});

router.post("/", function(req, res) {
  var partial = fs.readFileSync("views/_partials/_units.ejs", "utf8");
  var rendered = ejs.render(partial, {army: armies[req.body.index]});
  res.send(rendered);
});

module.exports = router;
