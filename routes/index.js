var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'd3-react-es6' });
});

router.get('/is_all', (req, res, next) => {
    res.sendFile(`${__dirname}/data/income_share_all.csv`);
});

module.exports = router;
