const productModels = require("../../models/adminModels/productModels");
const { error, success } = require("../../response");

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      color,
      productModel,
      protocol,
      certification,
      maxResolution,
      Price,
      oldPrice,
      quantity,
      description,
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

    const newProduct = new productModels({
      productName: productName,
      color: color,
      productModel: productModel,
      protocol: protocol,
      certification: certification,
      Price: Price,
      oldPrice: oldPrice,
      quantity: quantity,
      maxResolution: maxResolution,
      description: description,
    });
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "productImage") {
          newProduct.productImage.push(req.files[i].fieldname);
        }
      }
    }
    const saveProduct = await newProduct.save();
    console.log(saveProduct);
    res.status(201).json(success(res.statusCode, "Success", { saveProduct }));
  } catch (err) {
    console.log(err);
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
      color,
      productModel,
      protocol,
      certification,
      maxResolution,
      Price,
      oldPrice,
      quantity,
      description,
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
    const allData = {
      productName: productName,
      color: color,
      productModel: productModel,
      protocol: protocol,
      certification: certification,
      maxResolution: maxResolution,
      Price: Price,
      oldPrice: oldPrice,
      quantity: quantity,
      description: description,
      productImage: req.files.fieldname,
    };
    const updateProduct = await productModels.findByIdAndUpdate(id, allData, {
      new: true,
    });
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
