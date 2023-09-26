const productModels = require("../../models/adminModels/productModels");
const cartsModels = require("../../models/userModels/cartsModels");
const { error, success } = require("../../response");
const coupanModels = require("../../models/adminModels/coupanModels");
const userRegister = require("../../models/userModels/userRegister");

exports.addToCarts = async (req, res) => {
  try {
    const { product_Id, quantity, Price, user_Id } = req.body;
    if (!product_Id) {
      return res
        .status(201)
        .json(error("Please provide productId!", res.statusCode));
    }
    if (!quantity) {
      return res
        .status(201)
        .json(error("Please provide quantity!", res.statusCode));
    }
    if (!user_Id) {
      return res
        .status(201)
        .json(error("Please provide user_Id!", res.statusCode));
    }
    let cart;
    cart = await cartsModels.findOne({ user_Id: user_Id });
    if (cart) {
      const newProduct = cart.products.filter(
        (product) => String(product.products_Id) == String(product_Id)
      );
      if (newProduct.length) {
        newProduct[0].quantity = newProduct[0].quantity + +quantity;
        await cart.save();
        return res
          .status(201)
          .json(success(res.statusCode, "Product Added", { cart }));
      } else {
        cart.products.push({
          products_Id: product_Id,
          quantity: quantity,
          Price: Price,
        });
        await cart.save();
        return res
          .status(201)
          .json(success(res.statusCode, "Product Added", { cart }));
      }
    }
    const product = await productModels.findById(product_Id).select("Price");
    const newCarts = new cartsModels({
      user_Id: user_Id,
      products: [
        {
          products_Id: product_Id,
          quantity: quantity,
          Price: Price,
        },
      ],
    });
    const saveCarts = await newCarts.save();
    res.status(200).json(success(res.statusCode, "Success", { saveCarts }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.revomeCarts = async (req, res) => {
  try {
    const carts_Id = req.body.carts_Id;
    if (!carts_Id) {
      return res
        .status(201)
        .json(error("Please provide carts_Id!", res.statusCode));
    }

    const remove = await cartsModels.findByIdAndDelete(carts_Id);
    res.status(200).json(success(res.statusCode, "Success", { remove }));
  } catch (err) {
    console.log(err);
    res.status(200).json(error("Failed", res.statusCode));
  }
};

exports.cartsList = async (req, res) => {
  try {
    const id=req.params.id
    const listing = await cartsModels.find({user_Id:id}).populate("products.products_Id");
    res.status(200).json(success(res.statusCode, "Success", { listing }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.applyCoupan = async (req, res) => {
  try {
    const { coupanCode, carts, user_Id } = req.body;
    let product = [];
    const validCoupan = await coupanModels.find({ coupanCode: coupanCode });
    if (validCoupan == null) {
      return res.status(400).json(error("Invalid Coupan Code", res.statusCode));
    }
    for (let i = 0; i < carts.length; i++) {
      let object = {};
      object.product_Id = carts[i].product_Id;
      object.quantity = carts[i].quantity;
      let getPrice = await productModels
        .findById(carts[i].product_Id)
        .select("Price")
        .exec();
      object.Price = getPrice.Price;
      product.push(object);
    }
    let DiscountType = validCoupan.map((x) => x.Discount);
    let subtotal = 0;
    for (let i = 0; i < product.length; i++) {
      subtotal = subtotal + product[i].Price * product[i].quantity;
    }
    var cartsTotalSum = subtotal - subtotal * (DiscountType / 100);
    const total = await userRegister.findByIdAndUpdate(
      user_Id,
      { totalafterDiscount: cartsTotalSum },
      { new: true }
    );

    res.status(200).json(
      success(res.statusCode, "Success", {
        DiscountType,
        subtotal,
        cartsTotalSum,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productList = async (req, res) => {
  try {
    const productList = await productModels.find({});
    if (productList) {
      res.status(200).json(success(res.statusCode, "Success", { productList }));
    } else {
      return res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
