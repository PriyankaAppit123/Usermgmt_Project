const bcrypt = require('bcryptjs')

module.exports. hashPassword = (pass)=>{
    const salt =   bcrypt.genSalt(10);
        let  hashedPassword =  bcrypt.hash(pass, salt)
    return hashedPassword;
}

