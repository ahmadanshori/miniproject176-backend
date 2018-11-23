const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/M_User_Data");
const authConfig = require("../config/Auth_Config.json");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const M_user_BisnisLogic = {
  readUserAlHandler: (req, res, next) => {
    dtl.readUserAlHandlerData(items => {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },

  readEmployeeFromUser: (req, res, next) => {
    dtl.readEmployeeFromUser(items => {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },

  readUserByUsername: (req, res, next) => {
    let username = req.params.userid;
    dtl.readUserByUsername(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, username);
  },

  deleteUserHandler: (req, res, next) => {
    let id = req.params.id;
    dtl.deleteUserHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },

  create_User_Handler: (req, res, next) => {
    let username = req.body.username;
    dtl.readUserByUsername(docs => {
      //console.log(docs);
      if (docs) {
        ResponseHelper.sendResponse(res, 401, "User telah ada");
      } else {
        const newUser = {
          username: req.body.username,
          password: req.body.password,
          m_role_id: req.body.m_role_id,
          m_employee_id: req.body.m_employee_id,
          is_delete: false,
          created_by: req.body.created_by,
          created_date: new Date().toDateString()
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            console.log("hash password: " + newUser.password);
            dtl.create_User_Handler(function(items) {
              ResponseHelper.sendResponse(res, 200, items);
            }, newUser);
          });
        });
      }
    }, username);
  },

  Login_User_Handler: (req, res, nex) => {
    let username = req.body.username;
    let password = req.body.password;
    dtl.readUserByUsername(docs => {
      //console.log(docs);
      if (docs) {
        if (bcrypt.compareSync(password, docs.password)) {
          let token = jwt.sign(docs, authConfig.secretKey);
          delete docs.password;
          let berkas = {
            userdata: docs,
            token: token
          };

          ResponseHelper.sendResponse(res, 200, berkas);
        } else {
          ResponseHelper.sendResponse(res, 404, "Password not match");
        }
      } else {
        ResponseHelper.sendResponse(res, 404, "User not Found");
      }
    }, username);
  },

  updateUserById: (req, res, next) => {
    //param melalui object ID & tidak boleh ganti username
    let id = req.params.userid;
    const data = {
      // username: req.body.username,
      password: req.body.password,
      m_role_id: req.body.m_role_id,
      m_employee_id: req.body.m_employee_id,
      updated_date: new Date().toDateString()
      //update_by : req.body.update_by
      // update_by: req.userdata.username
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(data.password, salt, (err, hash) => {
        data.password = hash;
        console.log("hash password: " + data.password);
        dtl.updateUserHandler(
          items => {
            ResponseHelper.sendResponse(res, 200, items);
          },
          data,
          id
        );
      });
    });
  },

  UpdatePassword: (req, res, nex) => {
    let id = req.params.userid;
    let username = req.body.username;
    let password = req.body.password;
    dtl.readUserByUsername(docs => {
      if (docs) {
        if (bcrypt.compareSync(password, docs.password)) {
          const data = {
            password: req.body.newPassword,
            m_role_id: req.body.m_role_id,
            m_employee_id: req.body.m_employee_id,
            updated_date: new Date().toDateString()
            //update_by : req.body.update_by
            // update_by: req.userdata.username
          };
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
              data.password = hash;
              console.log("hash password: " + data.password);
              dtl.updateUserHandler(
                items => {
                  ResponseHelper.sendResponse(res, 200, items);
                },
                data,
                id
              );
            });
          });
        } else {
          ResponseHelper.sendResponse(res, 404, "Password not match");
        }
      } else {
        ResponseHelper.sendResponse(res, 404, "User not found");
      }
    }, username);
  }
};

module.exports = M_user_BisnisLogic;
