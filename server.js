const express = require('express');
const app  = express();   
const router = express.Router();

const PORT = process.env.PORT || 8080;
const data = require('./data');

router.get('/users', function(req, res, next) {
  console.log(data);
	res.json(data);
});

app.use('/api', router);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));