var express = require('express');
var router = express.Router();
var fs = require("fs");
var ejs = require("ejs");
var alliances;
var armies;

function sorter(a, b) {
  var aName = a.name.toLowerCase();
  var bName = b.name.toLowerCase();
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

fs.readFile("models/armies.json", "utf8", function(err, data) {
  if (err) throw err;
  alliances = JSON.parse(data).alliances;
  armies = alliances[0].armies;
  armies.sort(sorter);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {alliances: alliances, armies: armies, army: armies[0], faction: "Order"});
});

router.post("/", function(req, res) {
  var partial = fs.readFileSync("views/_partials/_units.ejs", "utf8");
  var rendered = ejs.render(partial, {army: armies[req.body.index]});
  res.send(rendered);
});

router.post("/armies", function(req, res) {
  var partial = fs.readFileSync("views/_partials/_armies.ejs", "utf8");
  armies = alliances[req.body.index].armies;
  armies.sort(sorter);
  var rendered = ejs.render(partial, {armies: armies, faction: alliances[req.body.index].name});
  res.send(rendered);
});

module.exports = router;
