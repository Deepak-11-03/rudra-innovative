const router = require('express').Router();
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')


router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/profile', auth.auth, userController.getProfile)
router.put('/update', auth.auth, userController.updateProfile)
router.delete('/delete-profile', auth.auth, userController.deleteProfile)

module.exports = router