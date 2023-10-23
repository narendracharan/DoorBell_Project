const coupanModels = require("../../models/adminModels/coupanModels");
const productModels = require("../../models/adminModels/productModels");
const { error, success } = require("../../response");

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productName_ar,
      color_ar,
      color,
      productModel,
      productModel_ar,
      protocol,
      protocol_ar,
      certification,
      certification_ar,
      maxResolution,
      maxResolution_ar,
      Price,
      oldPrice,
      quantity,
      description,
      description_ar,
      user_Id,
    } = req.body;
    if (!productName) {
      res.status(200).json(error("Please provide productName", res.statusCode));
    }
    if (!color) {
      res.status(200).json(error("Please provide color", res.statusCode));
    }
    if (!productModel) {
      res
        .status(200)
        .json(error("Please provide productModel", res.statusCode));
    }
    if (!protocol) {
      res.status(200).json(error("Please provide protocol", res.statusCode));
    }
    if (!certification) {
      res
        .status(200)
        .json(error("Please provide certification", res.statusCode));
    }
    if (!maxResolution) {
      res
        .status(200)
        .json(error("Please provide maxResolution", res.statusCode));
    }
    if (!Price) {
      res.status(200).json(error("Please provide Price", res.statusCode));
    }
    if (!protocol) {
      res.status(200).json(error("Please provide protocol", res.statusCode));
    }
    if (!oldPrice) {
      res.status(200).json(error("Please provide oldPrice", res.statusCode));
    }
    if (!quantity) {
      res.status(200).json(error("Please provide quantity", res.statusCode));
    }
    if (!description) {
      res.status(200).json(error("Please provide description", res.statusCode));
    }
    if (!user_Id) {
      res.status(200).json(error("Please provide user_Id", res.statusCode));
    }
    console.log(req.files);
    const newProduct = new productModels({
      productName: productName,
      productName_ar: productName_ar,
      color_ar: color_ar,
      color: color,
      productModel_ar: productModel_ar,
      productModel: productModel,
      protocol: protocol,
      protocol_ar: protocol_ar,
      certification: certification,
      certification_ar: certification_ar,
      Price: Price,
      oldPrice: oldPrice,
      quantity: quantity,
      maxResolution: maxResolution,
      maxResolution_ar: maxResolution_ar,
      description: description,
      description_ar: description_ar,
      user_Id: user_Id,
    });
    console.log(req.files);
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "productImage") {
          newProduct.productImage.push(
            `${process.env.BASE_URL}/${req.files[i].filename}`
          );
        }
      }
    }
    const saveProduct = await newProduct.save();
    res.status(201).json(success(res.statusCode, "Success", { saveProduct }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productList = async (req, res) => {
  try {
    const productListing = await productModels.find({});
    res
      .status(200)
      .json(success(res.statusCode, "Success", { productListing }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      productName,
      productName_ar,
      color,
      color_ar,
      productModel,
      productModel_ar,
      protocol,
      protocol_ar,
      certification,
      certification_ar,
      maxResolution,
      maxResolution_ar,
      Price,
      oldPrice,
      quantity,
      description,
      description_ar,
    } = req.body;
    const product = await productModels.findOne({ _id: id });
    console.log(req.files);
    console.log(product);
    const allData = {
      productName: productName,
      productName_ar: productName_ar,
      color: color,
      color_ar: color_ar,
      productModel: productModel,
      productModel_ar: productModel_ar,
      protocol: protocol,
      protocol_ar: protocol_ar,
      certification: certification,
      certification_ar: certification_ar,
      maxResolution: maxResolution,
      maxResolution_ar: maxResolution_ar,
      Price: Price,
      oldPrice: oldPrice,
      quantity: quantity,
      description: description,
      description_ar: description_ar,
      //   productImage:`${process.env.BASE_URL}/${req.files.filename}` ,
    };

    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "productImage") {
          product.productImage = `${process.env.BASE_URL}/${req.files[i].filename}`;
        }
      }
    }
    await product.save();
    const updateProduct = await productModels.findByIdAndUpdate(id, allData, {
      new: true,
    });

    console.log(updateProduct);
    res.status(200).json(success(res.statusCode, "Success", { updateProduct }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteproduct = await productModels.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteproduct }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};






