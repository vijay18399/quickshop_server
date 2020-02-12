var express         = require('express'),
   routes          =  express.Router();
var userController  = require('./controller/user-controller');


routes.get('/', (req, res) => {
    return res.send(' API End point');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);


routes.post('/order', userController.createOrder);
routes.get('/order', userController.GetOrders);
routes.delete('/order/:oid', userController.DeleteOrder);
routes.get('/order/:oid', userController.GetOrder);
routes.get('/myorder/:mid', userController.MyOrders);

routes.post('/product', userController.createProduct);
routes.get('/product', userController.GetProducts);
routes.delete('/product/:pid', userController.DeleteProduct);
routes.get('/product/:pid', userController.GetProduct);


module.exports = routes;
