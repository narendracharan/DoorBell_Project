const productModels = require("../../models/adminModels/productModels");
const cartsModels = require("../../models/userModels/cartsModels");
const orderModels = require("../../models/userModels/orderModels");
const userRegister = require("../../models/userModels/userRegister");
const { error, success } = require("../../response");
const { transporter } = require("../../services/mailServices");

exports.createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      companyName,
      address,
      city,
      country,
      total,
      postalCode,
      orderNotes,
      carts,
      user_Id,
    } = req.body;
    if (!firstName) {
      res.status(200).json(error("Please provide firstName", res.statusCode));
    }
    if (!lastName) {
      res.status(200).json(error("Please provide lastName", res.statusCode));
    }
    if (!companyName) {
      res.status(200).json(error("Please provide companyName", res.statusCode));
    }
    if (!address) {
      res.status(200).json(error("Please provide address", res.statusCode));
    }
    if (!city) {
      res.status(200).json(error("Please provide city", res.statusCode));
    }
    if (!country) {
      res.status(200).json(error("Please provide country", res.statusCode));
    }
    if (!postalCode) {
      res.status(200).json(error("Please provide postalCode", res.statusCode));
    }
    if (!orderNotes) {
      res.status(200).json(error("Please provide orderNotes", res.statusCode));
    }
    var totalQuatity = await productModels.find();
    console.log(totalQuatity);
    let product = [];
    for (let i = 0; i < carts.length; i++) {
      let object = {};
      object.product_Id = carts[i].product_Id;
      object.quantity = carts[i].quantity;
      object.Price = carts[i].Price;
      var totalQuantity = await productModels.findById({
        _id: carts[i].product_Id,
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
    var password = firstName + "@1234";

    const newOrder = new orderModels({
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      address: address,
      city: city,
      country: country,
      postalCode: postalCode,
      orderNotes: orderNotes,
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
      var mailOptions = {
        from: "s04450647@gmail.com",
        to: updated.user_Id.userEmail,
        subject: "Order Successfully",
        text: `Hello ${firstName}
        Thank you for placing an order with us. 
        yourEmail: ${updated.user_Id.userEmail}
        your Password:${password}
        Please do not share this email with anyone.This mail contains confidential details.
        Thank you for choosing us and we look forward to serving you again.`,
      };
      console.log(mailOptions);
      await transporter.sendMail(mailOptions);
    }
    await cartsModels.deleteMany({ user_Id: user_Id });

    res.status(200).json(success(res.statusCode, "Success", { saveOrder }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderList = await orderModels.find({ user_Id: id });
    if (orderList) {
      res.status(200).json(success(res.statusCode, "Success", { orderList }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetails = await orderModels.findById(id);
    if (orderDetails) {
      res
        .status(200)
        .json(success(res.statusCode, "Success", { orderDetails }));
    } else {
      res.status(201).json(error("NO Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
