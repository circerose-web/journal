const express = require('express');
const app = express();
const sequelize = require('./db');

let workout = require('./controllers/log-controller')
let user = require('./controllers/user-controller');

sequelize.sync();
//sequelize.sync({force: true})
app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/workout', workout);


app.listen(3000, function(){
    console.log('app is listening on port 3000');
});
