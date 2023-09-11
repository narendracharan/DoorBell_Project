const contactModels = require("../../models/userModels/contactUs");
const { error, success } = require("../../response");

exports.createContact = async (req, res) => {
  try {
    const { userName, userEmail, subject, descripation, user_Id } = req.body;
    if (!userName) {
      res.status(201).json(error("Please provide userName", res.statusCode));
    }
    if (!userEmail) {
      res.status(201).json(error("Please provide userName", res.statusCode));
    }
    if (!subject) {
      res.status(201).json(error("Please provide userName", res.statusCode));
    }
    if (!descripation) {
      res.status(201).json(error("Please provide userName", res.statusCode));
    }
    const newContact = new contactModels({
      userName: userName,
      userEmail: userEmail,
      subject: subject,
      descripation: descripation,
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
