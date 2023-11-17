const productModels = require("../../models/adminModels/productModels");
const cartsModels = require("../../models/userModels/cartsModels");
const orderModels = require("../../models/userModels/orderModels");
const userRegister = require("../../models/userModels/userRegister");
const { error, success } = require("../../response");
const { transporter } = require("../../services/mailServices");
const addressModels = require("../../models/userModels/addressModels");
const sendMail = require("../../services/EmailServices");




//  ------>    Create Order Api
exports.createOrder = async (req, res) => {
  try {
    const {
      firstName,
      firstName_ar,
      lastName,
      lastName_ar,
      companyName,
      companyName_ar,
      address,
      address_ar,
      city,
      city_ar,
      country,
      country_ar,
      total,
      address_Id,
      postalCode,
      orderNotes,
      orderNotes_ar,
      carts,
      locality,
      locality_ar,
      mobileNumber,
      title,
      title_ar,
      user_Id,
    } = req.body;
    // if (!firstName) {
    //   res.status(200).json(error("Please provide firstName", res.statusCode));
    // }
    // if (!lastName) {
    //   res.status(200).json(error("Please provide lastName", res.statusCode));
    // }
    // if (!companyName) {
    //   res.status(200).json(error("Please provide companyName", res.statusCode));
    // }
    // if (!address) {
    //   res.status(200).json(error("Please provide address", res.statusCode));
    // }
    // if (!city) {
    //   res.status(200).json(error("Please provide city", res.statusCode));
    // }
    // if (!country) {
    //   res.status(200).json(error("Please provide country", res.statusCode));
    // }
    // if (!postalCode) {
    //   res.status(200).json(error("Please provide postalCode", res.statusCode));
    // }
    // if (!orderNotes) {
    //   res.status(200).json(error("Please provide orderNotes", res.statusCode));
    // }
    var totalQuatity = await productModels.find();
    let product = [];
    for (let i = 0; i < carts.length; i++) {
      let object = {};
      object.products_Id = carts[i].products_Id;
      object.quantity = carts[i].quantity;
      object.Price = carts[i].Price;
      var totalQuantity = await productModels.findById({
        _id: carts[i].products_Id,
      });
      product.push(object);
    }
    // var total=0
    // for (let i = 0; i < product.length; i++) {
    //   total+= product[i].Price *product[i].quantity
    //   totalQuantity.quantity - product[i].quantity;
    // }
    // const total = await userRegister.find({ _id: user_Id });
    // const totalPrice = total.map((x) => x.totalafterDiscount);
    const userCount=await userRegister.find().count()
    const order_Id="doorBell"+userCount
    var password = firstName + "@1234";
    if (!address_Id) {
      const newAddress = new addressModels({
        title: title,
        title_ar: title_ar,
        firstName: firstName,
        firstName_ar: firstName_ar,
        lastName: lastName,
        lastName_ar: lastName_ar,
        companyName: companyName,
        companyName_ar: companyName_ar,
        address: address,
        address_ar: address_ar,
        country: country,
        country_ar: country_ar,
        pincode: postalCode,
        city: city,
        city_ar: city_ar,
        locality: locality,
        locality_ar: locality_ar,
        orderNotes: orderNotes,
        orderNotes_ar: orderNotes_ar,
        mobileNumber: mobileNumber,
        user_Id: user_Id,
      });
      await newAddress.save();
    }
    const newOrder = new orderModels({
      firstName: firstName,
      firstName_ar: firstName_ar,
      lastName: lastName,
      lastName_ar: lastName_ar,
      companyName: companyName,
      companyName_ar: companyName_ar,
      address: address,
      address_ar: address_ar,
      city: city,
      city_ar: city_ar,
      address_Id: address_Id,
      country: country,
      country_ar: country_ar,
      postalCode: postalCode,
      orderNotes: orderNotes,
      orderNotes_ar: orderNotes_ar,
      order_Id:order_Id,
      total: total,
      products: product,
      user_Id: user_Id,
    });
    const saveOrder = await newOrder.save();
    const user = await userRegister.findOne({ _id: user_Id });
    const updated = await orderModels
      .findOne({
        _id: newOrder._id,
      })
      .populate("user_Id");
    if (!user.passwordApp) {
      await userRegister
        .findByIdAndUpdate(
          { _id: user_Id },
          { passwordApp: password },
          { new: true }
        )
        .select("passwordApp");
      await sendMail(
        updated.user_Id.userEmail,
        `Order Successfully`,
        firstName,
        `<br.
          <br>
          Thank you for placing an order with us.<br>
          <br>
          <b> Your Email: ${updated.user_Id.userEmail}.</b>
          <br>
          Your Password:${password}
          <br>
          <br>
          Please do not share this email with anyone.This mail contains confidential details.<br>
          <br>
          Thank you for choosing us and we look forward to serving you again
          <br>
          <br>
          Amania<br>
          Customer Service Team<br>
          91164721
          `
      );
    }
    await cartsModels.deleteMany({ user_Id: user_Id });
    res.status(200).json(success(res.statusCode, "Success", { saveOrder }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};


///----------> User Order Api
exports.userOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderList = await orderModels
      .find({ user_Id: id })
      .populate("products.products_Id")
      .populate("user_Id");
    if (orderList) {
      res.status(200).json(success(res.statusCode, "Success", { orderList }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};


// --------- > Order Details APi
exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetails = await orderModels.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { orderDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


/// ------> Order Delete Api
exports.orderDelete = async (req, res) => {
  try {
    const deleteOrder = await orderModels.findByIdAndDelete(req.params.id);
    res.status(200).json(success(res.statusCode, "SUccess", { deleteOrder }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
