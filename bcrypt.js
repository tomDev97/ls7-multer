const bcrypt = require('bcrypt');
const password = '123';





const hashPass = async () => {
    let salt = await bcrypt.genSalt(10);
    let hashString = await bcrypt.hash(password, salt);
    console.log(`hashString : ${hashString}`);
    return hashString;
}

hashPass();
// const passHash = '$2b$10$Ocq1fHFU/YqyabU6/tS0FuWQnRS6nbxLZSD0ywB9Uyz3cLrTcXncm';
// let comparePass = async () => {
//     let isMatch = await bcrypt.compare(password, passHash);
//     console.log(` result : ${isMatch}`);
//     //if(true) => luu session.......................................cloud cloud.
// }