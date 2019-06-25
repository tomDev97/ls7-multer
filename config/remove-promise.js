const fs = require('fs');

const promiseRemove = (indexFinded, users, pathImgRemove) => {
    return new Promise(resolve => {
        try {
            pathImgRemove.forEach(pathImg => {
                fs.unlinkSync(pathImg, err => {
                    if(err) return resolve({err : true, message : err.message});
                    resolve({err : false, message : `REMOVE_IMAGE_SUCCESS`});
                })  
            })
            users.splice(indexFinded, 1);
            return resolve({err : false, message : 'REMOVE_USER_SUCCESS'});
        } catch (err) {
            resolve({err : true, message : err.message});
        }
    });
}
exports.PROMISE_REMOVE = promiseRemove;

