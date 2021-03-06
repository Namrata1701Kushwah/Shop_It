const Order = require("../models/order1");

const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { updateProduct } = require("./productController");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      ShippingPrice,
      totalPrice,
      paymentInfo,

    } = req.body;
  const order=await Order.create({
    orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        ShippingPrice,
        totalPrice,
        paymentInfo,
            paidAt:Date.now(),
            user:req.user._id
    
        })

//   const orders = Object.assign(
//     // {},
//     {
//       orderItems,
//       shippingInfo,
//       itemsPrice,
//       texPrice,
//       ShippingPrice,
//       totalPrice,
//       paymentInfo,
//       paidAt: Date.now(),
//       user: req.user._id,
//     }
//   );

  //   const order = await Order.create(orders);
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No order found with this id',404))
    }
    res.status(200).json({
        success:true,
        order
    })
})
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user.id})
    console.log("data",orders)

    res.status(200).json({
        success:true,
        orders
    })
}) 

exports.allOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user.id})

    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
}) 
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)

    if(order.orderStatus==='Delivered'){
        return next(new ErrorHandler('you have already deliverd this order',400))
    }
    order.orderItems.forEach(async item=>{
        await updateStock(item.product,item.quantity)
    })

    order.orderStatus=req.body.status,
    order.deleveredAt=Date.now()

    await order.save()
    res.status(200).json({
        success:true,
        
    })
}) 
async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.stock=product.stock-quantity;

    await product.save()
}
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No order found with this id',404))
    }
    await order.remove()
    res.status(200).json({
        success:true,
        
    })
})