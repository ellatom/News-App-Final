let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json())
app.use(cors());
 
require('./routes/posts.routes.js')(app);
require('./routes/users.routes.js')(app);

const multer = require('multer');

// Create a Server
app.listen(3030, function () {
 
  let host = 'localhost';
  let port = process.env.PORT || 3030;
 
  console.log("App listening at http://%s:%s", host, port)
 
});


 
// app.use((req,res,next)=>{
//   if(req.method === 'GET')
//   {
//       res.send('GET requests are disabled');
//   }
//   else{
//     next()
//   }

// })



// const jwt = require('jsonwebtoken');

// const myFunction = async ()=>{
//   const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'});
//   console.log(token);
//   const data = jwt.verify(token,'thisismynewcourse');
//   console.log(data);

//   // const password ='Red12345!';
//   // const hashedPassword = await bcrypt.hash(password,8);

//   // const isMatch = await bcrypt.compare('Red12345', hashedPassword);
//   // console.log(isMatch);

//}
//myFunction()