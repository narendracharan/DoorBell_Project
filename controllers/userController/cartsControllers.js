const productModels = require("../../models/adminModels/productModels");
const cartsModels = require("../../models/userModels/cartsModels");
const { error, success } = require("../../response");
const coupanModels = require("../../models/adminModels/coupanModels");
const userRegister = require("../../models/userModels/userRegister");
const userCoupan = require("../../models/adminModels/userCoupan");


/// ------ >  Add To Carts Api
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

// -------> Remove Carts Api
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


// ---------> Carts List Api
exports.cartsList = async (req, res) => {
  try {
    const id = req.params.id;
    const listing = await cartsModels
      .find({ user_Id: id })
      .populate("products.products_Id");
    res.status(200).json(success(res.statusCode, "Success", { listing }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

///----------> Update Quantity Api
exports.updateQuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const quantity = req.body.quantity;
    const updateQuantity = await cartsModels
      .findById(id)
      .populate("products.products_Id");
    for (const products of updateQuantity.products) {
      products.quantity = products.quantity + +quantity;
    }
    await updateQuantity.save();
    res
      .status(200)
      .json(success(res.statusCode, "Success", { updateQuantity }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

///-------> Product List Api
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


//-----> Apply Coupan Api
exports.coupanApply = async (req, res) => {
  try {
    const { coupanCode, user_Id } = req.body;
    const validCoupan = await coupanModels.findOne({ coupanCode: coupanCode });

    if (!validCoupan) {
      return res.status(201).json(error("Invalid Coupan Code", res.statusCode));
    }
    if (new Date() > validCoupan.endDate) {
      return res
        .status(201)
        .json(error("Coupan Code is Expired", res.statusCode));
    }
    let user = 1;
    let DiscountType = validCoupan.Discount;
    if (validCoupan.user == validCoupan.total) {
      return res
        .status(201)
        .json(error("User Coupan Limit Expired ", res.statusCode));
    }
    validCoupan.total = validCoupan.total + +user;
    await validCoupan.save();
    res.status(200).json(
      success(res.statusCode, "Success", {
        DiscountType,
        user_Id,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//--------> User Coupan Apply
exports.UsercoupanApply = async (req, res) => {
  try {
    const { coupanCode, user_Id } = req.body;
    const validCoupan = await userCoupan.findOne({ coupanCode: coupanCode });

    if (!validCoupan) {
      return res.status(201).json(error("Invalid Coupan Code", res.statusCode));
    }
   
    if (new Date() > validCoupan.endDate) {
      return res
        .status(201)
        .json(error("Coupan Code is Expired", res.statusCode));
    }
    let user = 1;
    let DiscountType = validCoupan.Discount;
    if (validCoupan.user == validCoupan.total) {
      return res
        .status(201)
        .json(error("User Coupan Limit Expired ", res.statusCode));
    }
    validCoupan.total = validCoupan.total + +user;
    await validCoupan.save();
    res.status(200).json(
      success(res.statusCode, "Success", {
        DiscountType,
        user_Id,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

///--------> Coupan List Api
exports.coupanList = async (req, res) => {
  try {
    const coupan = await userCoupan.find({});
    res.status(200).json(success(res.statusCode, "Success", { coupan }));
  } catch (err) {
    res.status(400).json(error("Error In Coupan List", res.statusCode));
  }
};
