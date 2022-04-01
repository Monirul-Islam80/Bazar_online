const express= require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProcutDetails,
     createProductReview, getAllReviews, deleteReviews, getAdminProducts } = require('../controller/productController');
const { isAuthUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get( getAllProducts);
router.route('/admin/product/new').post(isAuthUser, authorizedRoles('admin'), createProduct);
router.route('/admin/products').get(isAuthUser, authorizedRoles('admin'), getAdminProducts)
router.route('/admin/product/:id')
.put(isAuthUser, authorizedRoles('admin'), updateProduct)
.delete(isAuthUser, authorizedRoles('admin'), deleteProduct);

router.route('/product/:id').get( getProcutDetails);

router.route('/review').put(isAuthUser, createProductReview);
router.route('/reviews').get(getAllReviews).delete(isAuthUser, deleteReviews);




module.exports = router;