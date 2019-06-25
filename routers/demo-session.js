const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    req.session.LOGIN = true;
    res.json( { message : 'Login Success' } );
})

router.get('/admin', (req, res) => {
    let {LOGIN} = req.session;
    if(LOGIN) return res.json( { message : 'HELLO ADMIN' } );
    res.redirect('/session/err');
})


router.get('/err', (req, res) => {
    res.json( { message : 'Vui long login' } );
})

module.exports = router;