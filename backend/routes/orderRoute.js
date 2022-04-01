const express = require('express');
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrders, deleteOrder } = require('../controller/orderControl');
const { isAuthUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/order/new').post(isAuthUser, newOrder);
router.route('/order/:id').get(isAuthUser, getSingleOrder);
router.route('/orders/me').get(isAuthUser, getMyOrders);
router.route('/admin/orders').get(isAuthUser, authorizedRoles("admin"), getAllOrders);
router.route('/admin/orders/:id').put(isAuthUser, authorizedRoles("admin"),updateOrders).delete(isAuthUser, authorizedRoles("admin"),deleteOrder);

module.exports = router;