const router = require('express').Router()

router.get('/login', (req,res) => {
    res.render('login', {
       layout: 'login'
    })
  })

router.get('/home', (req,res) => {
    res.render('home', {
        layout: 'home'
    })
  })

  router.get('/profile', (req,res) => {
    res.render('profile', {
        layout: 'profile'
    })
  })

module.exports = router;