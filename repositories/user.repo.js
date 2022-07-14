
const dbConnection = require('../Usermgmt_Project/config/db.config');
const knex = require("knex")(dbConnection);


function selectUser(){
    return new Promise((resolve,reject)=>{
        knex('users')
        .select('Username','firstname','lastname', 'email','phoneNo')
        .then((users)=>{
            console.log("all user data is displayed")
            resolve(users)
        })  
  
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}


//body.firstname,body.lastname,body.dob,body.Gender,body.Username,hasedPassword,body.email,body.phoneNo);
function createUser(body,hashedPassword) {
    return new Promise((resolve, reject) => {
        knex('users')
        .insert({'firstname':body.firstname,'lastname':body.lastname,'dob':body.dob,'Gender':body.Gender,'Username':body.Username,'email':body.email, 'phoneNo':body.phoneNo,'Password': hashedPassword})
        .then(function (insertId) {
        console.log("insertId", insertId[0])
        resolve(insertId[0])
        })
        .catch(function (error) {
                reject(error)
        })
    })
}


function updateUser(userid,body){
    return new Promise((resolve,request)=>{
        knex('users')
        .where({id : userid})
        .update({Username:body.Username,email : body.email})
        .then((users)=>{
            console.log("user is updated!")
            resolve(users)
        })
        .catch((err)=>{
            console.log(err)
            reject(err)
        })
    })
}


function deleteUser(userid){
    return new Promise((resolve,reject)=>{
        knex('users')
        .where({id : userid})
        .del()
        .then((users)=>{
            console.log(" user is deleted !!")
            resolve(users)
        })
        .catch((err)=>{
            console.log(err)
            reject(err)
        })
    })
}


function paginate(page,limit){
    return new Promise((resolve, reject)=>{
        knex('users').
        select('*').limit(limit).offset(page*limit-limit)
        .then(function(users){
            resolve(users)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
 

function login(username){
    
    return new Promise((resolve, reject)=>{
        knex('users')
        .select('id','Username','Password').first()
        .where('Username',username) 
        .then(function(users){
            console.log()
            resolve(users)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}


function getData(userId){
    return new Promise((resolve,reject)=>{
        knex('users')
        .select('Username','firstname','lastname', 'email','phoneNo')
        .where({id:userId})
        .then(users=>{
            console.log("user details displayed")
            resolve(users)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
function selectUsername(body){
    return new Promise((resolve,reject)=>{
        knex('users')
        .select('Username')
        .where ({'Username' : body})
        .then((users)=>{
            console.log("username is displayed")
            resolve(users)
        })  
  
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}
function updatePass(pass){
    return new Promise((resolve,request)=>{
        knex('users')
        .where({Username : username})
        .update({Password : pass})
        .then((users)=>{
            console.log("Password is Updated!")
            resolve(users)
        })
        .catch((err)=>{
            console.log(err)
            reject(err)
        })
    })
}



// data should be in the same module.exports 
// if files are separated it will show errors 
module.exports = {
    createUser :createUser,
    selectUser:selectUser,
    updateUser :updateUser, 
    deleteUser: deleteUser,
    paginate :paginate,
     login: login,
     getData : getData,
     updatePass : updatePass,
     selectUsername :selectUsername
}