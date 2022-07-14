const dbConnection = require('../Usermgmt_Project/config/db.config')
const knex = require('knex')(dbConnection)

 function selectToken(token){
    return new Promise((resolve, reject)=>{
        //select token from user_token where token =
        knex('user_token')
        .select('token')      
        .where({'token':token}).first()
        .then((user) => {
         resolve(user)
        }).catch((err) => {
            reject(err)
        });
    })
}


function tokenAdd(userId,usertoken){
    return new Promise((resolve, reject)=>{
    knex('user_token')
    .insert({uid: userId, 'token':usertoken})
    .then((user) => {
     console.log("token added")   
     resolve(user)
    }).catch((err) => {
        reject(err)
    });
})
}


function tokenDelete(atoken){
    return new Promise((resolve, reject)=>{
    knex.from('user_token')
    .where("token", atoken)
    .del()
    .then((user) => {
     console.log("token deleted")   
     resolve(user)
    }).catch((err) => {
        reject(err)
    });
})
}



module.exports={
    selectToken :selectToken,
    tokenAdd    :tokenAdd,
    tokenDelete :tokenDelete  
}