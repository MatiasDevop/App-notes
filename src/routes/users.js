const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res)=>{
    res.send('singning at app');
});

router.get('/users/signup', (req, res)=>{
    res.send('Form to athentication');
});

module.exports = router;