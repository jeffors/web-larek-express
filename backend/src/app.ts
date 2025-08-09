var express = require('express')
var cors = require('cors')

const app = express();
app.use(cors());
app.listen(3000, () => {console.log('listening on port 3000')})