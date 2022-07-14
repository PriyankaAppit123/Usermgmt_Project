var express = require('express');
var router = express.Router();
var controller = require('../Usermgmt_Project/validators/controller/user.controller');
var schema  = require('../validators/auth.validator')
const validator = require('../validators/validator')
const {insert, update,query,login} = require("../validators/auth.validator")
const jwt_verify = require('../jwt')

router.get('/alluser',jwt_verify.verifyJwt,controller.showUser)
router.get('/getuser',jwt_verify.verifyJwt,controller.userDetail)
router.get('/',jwt_verify.verifyJwt,validator(query,'query'),controller.paginateUser)
router.get('/:id',jwt_verify.verifyJwt,controller.userDetailbyId)
router.post('/login',validator(login,"body"),controller.AuthLogin);
router.post('/',jwt_verify.verifyJwt,controller.forgotPass);
router.post('/adduser',jwt_verify.verifyJwt,validator(insert,'body'),controller.addUser)
router.put('/:userid',jwt_verify.verifyJwt,validator(update,"body"),controller.updateUser)
router.delete('/:userid',jwt_verify.verifyJwt,controller.deleteUser);
router.delete('/logout',jwt_verify.verifyJwt,controller.logout);



module.exports = router;


