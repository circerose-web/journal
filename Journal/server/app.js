let express = require('express');
let app = express();
//**ADD LINE BELOW */
let sequelize = require('./db');

let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
//sequellize.sync({force: true})

app.user('/user', user);

app.use('/journal', journal);

app.listen(3000, function(){
    console.log('app is listening on port 3000');
})



