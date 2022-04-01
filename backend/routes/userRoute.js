const express = require('express');
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getAllUser, updateUserRole, deleteUser } = require('../controller/userController');
const { isAuthUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:Token').put(resetPassword);
router.route('/password/update').put( isAuthUser, updateUserPassword);
router.route('/logout').get(logOut);
router.route('/me').get( isAuthUser, getUserDetails);
router.route('/me/update').put( isAuthUser, updateUserProfile);
router.route('/admin/users').get(isAuthUser, authorizedRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthUser, authorizedRoles('admin'), getAllUser)
.put(isAuthUser, authorizedRoles('admin'), updateUserRole)
.delete(isAuthUser, authorizedRoles('admin'), deleteUser);


module.exports = router;


 
