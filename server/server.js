// server.js
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var Cryptr = require('cryptr');
var app = express();
const sanitizeBody = require('express-validator');
var port = process.env.port || 3005;

//Key For Encrypt and Decrypt
const cryptr = new Cryptr('Mysecreate');

//Server Details
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'contactbook'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Checking Connection  Status with Database.
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

/* //isLogin
app.get('/isLogin', function(req, res, next){
  var session = JSON.parse(sessionStorage.getItem('current_user'));
  let session_id = session.id;
  console.log(session); 
}); */

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

//For Signup
app.post('/signup', function (req, res, next) {
  var name = req.body.form.name;
  var email = req.body.form.email;
  var phone = req.body.form.phone;
  var password = req.body.form.password;
  var address = req.body.form.address;
  var encryptedString = cryptr.encrypt(password);
  console.log(name, email, phone, password, encryptedString, address);
  // console.log(name,"sa");
  if(name ==''){
    res.json({
      success: false,
      error: "ENTER YOUR NAME (REQUIRED)"
    });
  }else if(email == ''){
    res.json({
      success: false,
      error: "ENTER YOUR Email (REQUIRED)"
    });
  }else if(address==''){
    res.json({
      success: false,
      error: "ENTER YOUR Address (REQUIRED)"
    });
  }else if(password==''){
    res.json({
      success: false,
      error: "ENTER  Password (REQUIRED)"
    });
  }else{
    var query = connection.query('SELECT * FROM user WHERE email=?',email, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        if(result.length > 0){
          res.json({
            success: false,
            error: "This Email Id Already Registerd"
          });  
        }else{
          var query = connection.query('INSERT INTO `user`(`name`, `email`, `phone`, `address`, `password`) VALUES (?,?,?,?,?)', [name, email, phone, address, encryptedString], function (err, result) {
            if (err) {
              console.error(err);
              res.json({
                success: false,
                error: err.message
              });
              return;
              //  return res.send(err);
            } else {
              console.log(result);
              res.json({
                success: true,
                data: "You are Successfully Registerd"
              });
              //  return res.send(result);
            }
          });
        }
      }
    });
  }
});
  
// });
//For Login 
app.post('/login', function (req, res, next) {
  console.log(req.body);
  var email = req.body.form.email;
  var password1 = req.body.form.password;
  console.log(email, password1);
  var query = connection.query('SELECT * FROM  `user` WHERE email = ?', email, function (err, result) {
    if (err) {
      console.error(err);
      res.json({
        success: false,
        error: err
      })
      return res.send(err);
    } else {
      if (result.length > 0) {
        var decryptedString = cryptr.decrypt(result[0].password);
        console.log(decryptedString);
        if (password1 == decryptedString) {
          res.json({
            success: true,
            data: result[0]
          });
        } else {
          res.json({
            success: false,
            error: "Email and password does not match"
          });
        }
      } else {
        res.json({
          success: false,
          error: "Email does not exits"
        });
      }
    }
  });
});

//Profile 
app.post('/profile', function (req, res, next) {
  var current_user = req.body.userid;
  var query = connection.query('SELECT user.* ,COUNT(contacts.contact_id) AS "total_contacts" FROM user INNER JOIN contacts ON contacts.user_id = user.id WHERE user_id=?', [current_user], function (err, result) {
    if (err) {
      console.error(err);
      // return res.send(err);
      res.json({
        success: false,
        error: err.message
      });
      return;
    }
    if (result.length > 0) {
      res.json({
        success: true,
        data: result[0]
      });
    } else {
      res.json({
        success: true,
        data: null
      });
    }
  });
});


//Add New Contact 
app.post('/addcontact', function (req, res, next) {
  console.log(req.body);
  var name = req.body.form.name;
  var email = req.body.form.email;
  var phone = req.body.form.phone;
  var address = req.body.form.address;
  var current_user = req.body.form.current_user;
  // var current_user = 2;

  var query = connection.query('SELECT * FROM  contacts where user_id = ? and phone = ?', [current_user, phone], function (err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    } else {
      console.log(result);

      if (result.length > 0) {
        res.json({
          success: false,
          error: "Mobile Number Already Exists"
        });
      } else {
        var query = connection.query('INSERT INTO `contacts`(`name`, `email`, `phone`, `address`,user_id) VALUES (?,?,?,?,?)', [name, email, phone, address, current_user], function (err, result) {
          if (err) {
            console.error(err);
            return res.send(err);
          } else {
            console.log(result);
            res.json({
              success: true,
              data: "Successfully Inserted."
            });
            // return res.send(result);
          }
        });
      }
      // return res.send(result);
      // res.json({
      //   success: true,
      //   data: result
      // });
    }
  });
});




  //Contact List 
  app.post('/contactlist', function (req, res, next) {
    var current_user = req.body.userid;
    var query = connection.query('SELECT user.id ,contacts.* FROM  user INNER JOIN contacts on user.id = user_id where user.id = ? ORDER BY `contact_id` DESC', [current_user], function (err, result) {
      if (err) {
        console.error(err);
        return res.send(err);
      } else {
        console.log(result);
        // return res.send(result);
        res.json({
          success: true,
          data: result
        });
      }
    });
  });

  //delete Contact
  app.post('/deletecontact', function (req, res, next) {
    console.log(req.body);
    var contact_id = req.body.form.contact_id;
    var current_user = req.body.form.current_user;
    console.log(contact_id, current_user);

    var query = connection.query('DELETE FROM `contacts` WHERE contact_id= ? AND user_id = ?', [contact_id, current_user], function (err, result) {
      if (err) {
        console.error(err);
        res.json({
          status: false,
          error: err
        });
        // return res.send(err);
      } else {
        console.log(result);
        // return res.send(result);
        res.json({
          success: true,
          data: "Successfully Deleted."
        });
      }
    });
  });

  //Update Profile Page
  app.post('/updateprofile', function (req, res, next) {
    var name = req.body.form.name;
    var email = req.body.form.email;
    var phone = req.body.form.phone;
    var address = req.body.form.address;
    var userid = req.body.form.userid;
    var query = connection.query('Select * From user Where email = ? AND NOT id=?',[email,userid],function(err,result){
      if (err) {
        console.error(err);
        return res.send(err);
      } else {
        console.log(result);
        if(result.length>0){
          res.json({
            success:false,
            error:'Already have with this email'
          });
        }else{
          var query = connection.query('UPDATE `user` SET `name`=?,`email`= ?,`phone`=?,`address`=? WHERE id = ?', [name, email, phone, address,userid], function (err, result) {
            if (err) {
              console.error(err);
              return res.send(err);
            } else {
              console.log(result);
              if(result.affectedRows>0){
                res.json({
                  success: true,
                  data: 'Profile info Successfully Updated'
                });
              }else{
                res.json({
                  success: false,
                  error: 'Not Updated'
                });
              }
              // return res.send(result);
            }
          });
        }
      }
    });
  });
  //Update Password {params => {userid: "3", password: "123455"}}
  app.post('/updatepassword', function (req, res, next) {
    var passtext = req.body.form.password;
    var password = cryptr.encrypt(passtext);
    var current_user = req.body.form.userid;
    var query = connection.query('UPDATE `user` SET `password`=? WHERE id = ?', [password, current_user], function (err, result) {
      if (err) {
        console.error(err);
        return res.send(err);
      } else {
        console.log(result);
        if(result.affectedRows>0){
          res.json({
            success: true,
            data: 'Password Successfully Updated'
          });
        }else{
          res.json({
            success: false,
            error: 'Not Updated'
          });
        }
        // return res.send(result);
      }
    });
  });
  //Contact By Id For Edit Form Data
  app.post('/contactbyid', function (req, res, next) {
    console.log(req.body);
    var contact_id = req.body.id;
    var query = connection.query('Select * From contacts Where contact_id = ?',contact_id,function(err,result){
      if (err) {
        console.error(err);
        return res.send(err);
      } else {
        console.log(result);
        // return res.send(result);
        if(result.length>0){
          res.json({
            success: true,
            data: result[0]
          });
        }else{
          res.json({
            success: true,
            data: null
          });
        }
      }
    }); 
  });

  //Update Contact
  app.post('/updatecontact', function (req, res, next) {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var current_user = req.body.currentUser;
    var contact_id = req.body.contactid;

    var query = connection.query('SELECT * FROM contacts WHERE user_id =? AND phone = ? AND NOT contact_id=?',[current_user,phone,contact_id],function(err,result){
      if (err) {
        console.error(err);
        return res.send(err);
      } else {
        console.log(result);
        // return res.send(result);
        if(result.length>0){
          res.json({
            success: false,
            error: 'Phone Number Already Exist'
          });
        }else{
          var query = connection.query('UPDATE `contacts` SET `name`= ?,`email`= ?,`phone`= ?,`address`= ? WHERE contact_id = ?', [name, email, phone, address, contact_id], function (err, result) {
          if (err) {
            console.error(err);
            return res.send(err);
          } else {
            console.log(result);
            if(result.affectedRows>0){
              res.json({
                success: true,
                data: 'Data Successfully Updated'
              });
            }else{
              res.json({
                success: true,
                data: 'Not Updated'
              });
            }
              // return res.send(result);
           }
        });
        }
      }
    });
  });

  //Show Total Contacts For Current User
app.post('/totalContacts',function(req,res,next){
  currentUser = req.body.userId;
  if(!currentUser){
    res.json({
      success:false,
      error :'User id Not Found'
    });
  }else{
    var query=connection.query("SELECT count(contact_id) as Total FROM contacts where user_id = ?",currentUser, function(err,result){
      // console.log(query);
      if(err){
        console.log(err);
        res.send(err);
      }else{
        res.json({
          success:true,
          data:result[0]
        });
        return;
      }  
    });
  }
})

  //Listen Port
  app.listen(port, function () {
    console.log("Express is Running");
  });
