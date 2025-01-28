
const express = require("express");
const { userRouter } = require("./userRoutes.js");
const { sellerRouter } = require("./sellerRoutes.js");
const { adminRouter } = require("./adminRoutes.js");
const { productRouter } = require("./productRoutes.js");
const { wishlistRouter } = require("./wishlistRoutes.js");
const { cartRouter } = require("./cartRoutes.js");
const { orderRouter } = require("./orderRoutes.js");
const { reviewRouter } = require("./reviewRoutes.js");
// const { productRouter} = require("./productRoutes.js");
// const { cartRouter} = require("./cartRoutes.js");
// const { wishlistRouter} = require("./wishlistRoutes.js");
// const { orderRouter } = require("./orderRoutes.js");
// const { paymentRouter } = require("./paymentRoutes.js");
// const { adminRouter } = require("./adminRoutes.js");
// const { sellerRouter } = require("./sellerRoutes.js");
// const { reviewRouter } = require("./reviewRoutes.js");
// const { searchRouter } = require("./searchRoutes.js");

const router = express.Router();

router.use('/users', userRouter);
router.use('/seller', sellerRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);
router.use('/wishlist', wishlistRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/review', reviewRouter);
// router.use("/products", productRouter);
// router.use("/cart", cartRouter); 
// router.use("/wishlist", wishlistRouter);
// router.use("/orders", orderRouter);
// router.use("/payments", paymentRouter);
// router.use("/admin", adminRouter);
// router.use("/seller", sellerRouter);
// router.use("/reviews", reviewRouter); 
// router.use("/search", searchRouter);  

// module.exports = router ;
module.exports = { apiRouter: router};