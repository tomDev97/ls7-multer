const express = require('express');
const fs = require('fs');
const path = require('path');
const MULTER_CONFIG = require('../ultis/multer-config');
const  {PROMISE_REMOVE} = require('../config/remove-promise');
const router = express.Router();


var users = [
    {
        id : 1,
        name : 'Tom',
        img: {
            mainImg : ['main1.jpg'],
            ortherImg : [ 'user1.jpg', 'user11.jpg' ]
        }
    },
    {
        id : 2,
        name : 'kuro',
        img: {
            mainImg : ['main2.jpg'],
            ortherImg : [ 'user1.jpg', 'user11.jpg' ]
        }
    }
]

/**
 * GET LIST USER
 */
router.get('/', (req, res )=> {
    res.render('users', { error : false , users });
})

/**
 * POST
 * EDES: CREATE A NEW USER
 */

// router.post('/create', MULTER_CONFIG.array('image', 3), (req, res) => {
//     const  { id, name } = req.body;
//     const files  = req.files; 
//     let imgOriginalname = files.map(file =>  file.filename);   
//     // console.log(imgOriginalname);
    


//     let isExits = users.findIndex( user => Object.is(id.toString(), user.id.toString()));
//     if(isExits !== -1) {
//         return res.render('users', {error:true, message:'id_exits', users});
//     } 
//     users.push({id, name, img : imgOriginalname});
//     return res.render('users', {error : false, users});
// })



const multer_config_fields = [
    { name : 'mainImg', maxCount : 1},
    { name : 'ortherImg', maxCount : 2}
]
//using fields
router.post('/create', MULTER_CONFIG.fields(multer_config_fields), (req, res) => {
    const  { id, name } = req.body;  

    let mainImg = req.files.mainImg.map(img => img.originalname); //array
    let ortherImg = req.files.ortherImg.map(img => img.originalname); //array
    
    let isExits = users.findIndex( user => Object.is(id.toString(), user.id.toString()));
    if(isExits !== -1)
        return res.render('users', {error:true, message:'id_exits', users});
    users.push({id, name, img : {mainImg, ortherImg}});
    res.render('users', {error : false, users});
})




// REMOVE USER AND IMAGE WITH CALLBACK ES5
// router.get('/remove/:id', (req, res) => {
//     let { id } = req.params;
//     let indexFinded = users.findIndex(user => Object.is(id.toString(), user.id.toString()));
//     let infoUserFinded = users[indexFinded];
//     let pathImgRemove = path.resolve(__dirname,`../public/upload/${infoUserFinded.img}`);
//     if(infoUserFinded) {
//         fs.unlink(pathImgRemove, err => {
//             if(err) res.json({ message : err.message});
//             users.splice(indexFinded, 1);
//             res.redirect('/user');
//         })
//     }  else {
//         res.json('USER KHONG TON TAI');
//     }
// })

//remove user and image with promise - async
// router.get('/remove-promise/:id', async (req, res) => {
//     let {id} = req.params;
//     let indexFinded = users.findIndex(user => Object.is(id.toString(), user.id.toString()));

//     //check indexFinded  > 0  ||  indexFinded !== null  || indexFinded  !== undefined 

//     let infoUserFinded = users[indexFinded];

//     //array link image
//     let pathImgRemove = infoUserFinded.img.map(pathImg => {
//         return path.resolve(__dirname,`../public/upload/${pathImg}`);
//     })
//     let result = await PROMISE_REMOVE(indexFinded, users, pathImgRemove);
//     if (result.err) return res.json(result);
//     return res.redirect('/user');   
// })


//remove with flieds
router.get('/remove-promise/:id', async (req, res) => {
    let {id} = req.params;
    let indexFinded = users.findIndex(user => Object.is(id.toString(), user.id.toString()));
    let infoUserFinded = users[indexFinded];

    let arrImg = infoUserFinded.img.mainImg.concat(infoUserFinded.img.ortherImg);
    
    // array link image
    let pathImgRemove = arrImg.map(pathImg => {
        return path.resolve(__dirname,`../public/upload/${pathImg}`);
    })

    let result = await PROMISE_REMOVE(indexFinded, users, pathImgRemove);
    if (result.err) return res.json(result);
    return res.redirect('/user');   
})



module.exports = router;