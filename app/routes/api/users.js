const router = require('express').Router();
const userController = require('../../controllers/api/user.controller');

router.get('/getAll', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:id', userController.updateById);
router.put('/updateUsers', userController.updateMultiple);
router.delete('/deleteUser/:id', userController.deleteUserById);

module.exports = router;