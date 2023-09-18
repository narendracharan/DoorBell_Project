const addressModels = require("../../models/userModels/addressModels");
const contactModels = require("../../models/userModels/contactUs");
const { error, success } = require("../../response");

exports.createContact = async (req, res) => {
  try {
    const { userName, userEmail, mobileNumber, descripation, user_Id } =
      req.body;
    if (!userName) {
      res.status(201).json(error("Please provide userName", res.statusCode));
    }
    if (!userEmail) {
      res.status(201).json(error("Please provide userName", res.statusCode));
    }
    if (!mobileNumber) {
      res
        .status(201)
        .json(error("Please provide mobileNumber", res.statusCode));
    }
    if (!descripation) {
      res.status(201).json(error("Please provide userName", res.statusCode));
    }
    const newContact = new contactModels({
      userName: userName,
      userEmail: userEmail,
      mobileNumber: mobileNumber,
      descripation: descripation,
      user_Id: user_Id,
    });
    const saveData = await newContact.save();
    res.status(200).json(success(res.statusCode, "Success", { saveData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.contactList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const contactList = await contactModels.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    });
    if (contactList) {
      res.status(200).json(success(res.statusCode, "Success", { contactList }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.viewDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const contactDetails = await contactModels.findById(id);
    if (contactDetails) {
      res
        .status(200)
        .json(success(res.statusCode, "Success", { contactDetails }));
    } else {
      res.status(400).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.contactDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteContact = await contactModels.findByIdAndDelete(id);
    if (deleteContact) {
      res
        .status(200)
        .json(success(res.statusCode, "Deleted Success", { deleteContact }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, userEmail, mobileNumber, descripation, status } =
      req.body;
    const updateContact = await contactModels.findByIdAndUpdate(
      id,
      {
        userName: userName,
        userEmail: userEmail,
        mobileNumber: mobileNumber,
        descripation: descripation,
        status: status,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { updateContact }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.createAddress = async (req, res) => {
  try {
    const { title, address, country, locality, pincode, user_Id } = req.body;
    if (!title) {
      res.status(201).json(error("please provide title", res.statusCode));
    }
    if (!address) {
      res.status(201).json(error("please provide address", res.statusCode));
    }
    if (!country) {
      res.status(201).json(error("please provide country", res.statusCode));
    }
    if (!locality) {
      res.status(201).json(error("please provide locality", res.statusCode));
    }
    if (!pincode) {
      res.status(201).json(error("please provide pincode", res.statusCode));
    }
    if (!user_Id) {
      res.status(201).json(error("please provide user_Id", res.statusCode));
    }
    const newAddress = new addressModels({
      title: title,
      address: address,
      country: country,
      locality: locality,
      pincode: pincode,
      user_Id: user_Id,
    });
    await newAddress.save();
    res.status(200).json(success(res.statusCode, "Success", { newAddress }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addressList = async (req, res) => {
  try {
    const id = req.params.id;
    const addressList = await addressModels
      .find({ user_Id: id })
      .sort({ createdAt: -1 });
    if (addressList) {
      res.status(200).json(success(res.statusCode, "Success", { addressList }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addressEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, address, country, locality, pincode } = req.body;
    if (!title) {
      res.status(201).json(error("please provide title", res.statusCode));
    }
    if (!address) {
      res.status(201).json(error("please provide address", res.statusCode));
    }
    if (!country) {
      res.status(201).json(error("please provide country", res.statusCode));
    }
    if (!locality) {
      res.status(201).json(error("please provide locality", res.statusCode));
    }
    if (!pincode) {
      res.status(201).json(error("please provide pincode", res.statusCode));
    }
    const updateAddress = await addressModels.findOneAndUpdate({_id:id}, {
      title: title,
      address: address,
      country: country,
      locality: locality,
      pincode: pincode,
    });
    if (updateAddress) {
      res
        .status(200)
        .json(success(res.statusCode, "Success", { updateAddress }));
    } else {
      res.status(201).json(error("NO Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteAddress = await addressModels.findByIdAndDelete(id);
    if (deleteAddress) {
      res
        .status(200)
        .json(success(res.statusCode, "Address Deleted", { deleteAddress }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
