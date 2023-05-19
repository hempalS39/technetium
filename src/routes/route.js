const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const orderController= require("../controllers/orderController")
const productController = require('../controllers/productController')
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser",commonMW.mid1, UserController.createUser )
router.post("/createProduct", productController.createProduct)
router.post("/createOrder" ,commonMW.mid1, orderController.createOrder)


router.post("/basicRoute", commonMW.mid1, UserController.basicCode)

module.exports = router;