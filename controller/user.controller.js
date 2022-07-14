const repository = require('../../repositories/user.repo');
const repo = require('../../repositories/token.repo')
const statusCodes = require('http-status-codes').StatusCodes
const bcrypt = require('bcryptjs');
const hash = require('../middleware/Hash')
const jwt = require('jsonwebtoken');
const { secret } = require('../../Usermgmt_Project/config/Authkey');
const { selectUsername } = require('../../repositories/user.repo');


async function showUser(req, res) {
    try{
        let response = await repository.selectUser();
        console(response)
        if (badEmptyCheck(response) === true)
            res.send(response)
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send(error );
    }
}

async function addUser(req, res) {
    try {
        let body = req.body
        const salt = await bcrypt.genSalt(10);
        let  hash =  await bcrypt.hash(body.password, salt)
        let response = await repository.createUser(body,hash);
        console.log(hash, response, salt )
          if(response)
            return res.sendStatus(statusCodes.OK).send("Successfully Inserted"); 
       }
     catch (error) {
     res.status(statusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}


let updateUser = async function(req,res){
    try{  
        let userid = req.params.userid
        let body  = req.body
        if(body.Password){
            let hashed = hash.hashPassword(body.Password)
        }
        let response = await repository.updateUser(userid, body);
        if (badEmptyCheck(response) === true)
        res.status(statusCodes.ACCEPTED).send({ 'message': `id :${userid} data updated` })  
    }
    catch (error) {
        res.sendStatus(statusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

async function deleteUser(req, res) {
    try 
    { 
        let userid = req.params.userid;
        let response = await repository.deleteUser(userid);
        if (badEmptyCheck(response) === true)
            return res.status(statusCodes.OK).send({'message': `Data of Userid ${userid} is deleted` });
    } catch (error)  {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

async function paginateUser(req, res) {
    try 
    { 
        let page = req.query.page;
        let limit = req.query.limit;
        let response  = await repository.paginate(page,limit)

        if((badEmptyCheck(response) === true))
            res.send(response)
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}


 async function AuthLogin (req,res){
   
    try 
    { 
        let body = req.body
        console.log(body)
        // if error occurs in response then it move to catch block 
        let response  = await repository.login(body.Username)
        let validate = await bcrypt.compare(body.Password, response.Password)  
        //console.log(body.Password, response.Password)
        let userid = response.id
        console.log(userid,validate)

         if(validate ){
            let token = jwt.sign({
                data: userid
            }, secret, { expiresIn: '1d' })
            let insertData =await repo.tokenAdd(userid,token)
            if(insertData)  
                console.log("success")
            else   
                console.log("error")
            res.status(statusCodes.OK).send([{"message":"user logged in Succesfully"},
                                { "authtoken" :  token }])                        
        }else{
            res.status(statusCodes.EXPECTATION_FAILED).send({"message":"user credentials not matched "});}
       
    } catch(error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send({error : {'message' :["user do not exists", "login failed "]}});
    }
}
function isEmpty(value) {
    return Object.keys(value).length === 0;
  }
async function userDetailbyId(req,res){
    try{
        let body = req.params.id;
        console.log(body)
        let response = await repository.getData(body);
        //console.log(typeof response)
        console.log(isEmpty(response))
        if(isEmpty(response) === true){
            return  res.status(statusCodes.NOT_FOUND).send({"message": "user do not exists "})
        } else 
            return res.status(statusCodes.OK).send(response); 
    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}


async function userDetail(req,res){
    try{
        let body = req.body.id;
        let response = await repository.getData(body);
        console.log(response)
         if (isEmpty(response) === true)
            res.status(statusCodes.OK).send(response);
    }
    catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send({error:{message : "No data to display"}});
    }
}


async function  logout(req,res){
    try{
        let body = req.header('auth-token')
        let response = await repo.tokenDelete(body);
        if(badEmptyCheck(response) === true)
            res.status(statusCodes.OK).send({"message" : "User Logout "})
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send({error:{message :"User cannot logout"}});
    }
}

async function changePass(pass){  
    let hash = hashPassword(body.Password)
   let response = await repository.updatePass(hash);
        if(badEmptyCheck(response) === true)
            return console.log({"message" : "Password Changed"});
 }

async  function forgotPass(req,res){
    try{
        let type = req.body.type;
        let body = req.body
        if(type === 'yes'){
            username = body.Username
            let response = await selectUsername(username);
            console.log(response)
            if(badEmptyCheck(response) === true){
                changePass(body.Password)
                res.send({message : "Password Changed"})
            }else{
                res.send({message : "Invalid username"})
                
            }
        }
        else{
            res.send({message :"no changes to update"})
        }
    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send({error : "there is no password"});

    }
}

module.exports = {
    addUser : addUser,
    showUser: showUser,
    updateUser:updateUser,
    deleteUser :deleteUser,
    paginateUser :paginateUser,
    AuthLogin: AuthLogin,
    userDetail : userDetail,
    userDetailbyId:userDetailbyId,
    changePass : changePass,
    forgotPass:forgotPass,
    logout :logout

}