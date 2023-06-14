let myExpress = require('express');
let myApp = myExpress();
myApp.use(myExpress.json());
let User = require('./models/User');
require('./models/db');

myApp.post('/singup', async function (req, resp) {
  let neyaUser = new User(req.body);
  await neyaUser.save();
  resp.end('user add ho gya');
});

myApp.post('/login', async function (req, resp) {
  let userMillGya = await User.findOne({
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  });
  if (userMillGya) {
    resp.json(userMillGya);
  }
});

myApp.get('/all_users', async function (req, resp) {
  let all_Users = await User.find();
  resp.json(all_Users);
});

myApp.post('/currentUserDetails', async function (req, resp) {
  try {
    const currentUser = await User.findByIdAndUpdate(req.body.currentId, {
      date: req.body.date,
    });
    // if (currentUser) {
    // resp.json(currentUser)
    resp.json({
      success: true,
    });
    // }
  } catch (e) {
    resp.status(500).json(e);
  }
});

myApp.listen(3005, function () {
  console.log('server is challing');
});
