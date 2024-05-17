const express = require('express')
const router = express.Router()
const SignUpContraller = require('../contraller/userContraller')

router.post('/signUp', SignUpContraller)


module.exports = router
