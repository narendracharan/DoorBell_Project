const contentSchema = require("../../models/adminModels/contentModels");
const faqsModels = require("../../models/adminModels/faqsModels");
const orderModels = require("../../models/userModels/orderModels");
const { success, error } = require("../../response");

exports.createContent = async (req, res) => {
  try {
    const { title_en, Description_en, title_ar, Description_ar } = req.body;
    const newContent = new contentSchema({
      title_en: title_en,
      Description_en: Description_en,
      title_ar: title_ar,
      Description_ar: Description_ar,
    });
    const newData = await newContent.save();
    res.status(200).json(success(res.statusCode, "Success", { newData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.contentListing = async (req, res) => {
  try {
    const listing = await contentSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { listing }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editContent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_en, Description_en, title_ar, Description_ar } = req.body;
    let updateContent = await contentSchema.findByIdAndUpdate(id, {
      title_en: title_en,
      Description_en: Description_en,
      title_ar: title_ar,
      Description_ar: Description_ar,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateContent }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.createFaqs = async (req, res) => {
  try {
    const { title, description, title_ar, description_ar } = req.body;
    if (!title) {
      res.status(201).json(error("please provide title", res.statusCode));
    }
    if (!description) {
      res.status(201).json(error("please provide description", res.statusCode));
    }
    const newFaq = new faqsModels({
      title: title,
      description: description,
      title_ar: title_ar,
      description_ar: description_ar,
    });
    const saveFaqs = await newFaq.save();
    res.status(200).json(success(res.statusCode, "Success", { saveFaqs }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editFaqs = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, title_ar, description_ar } = req.body;
    const updateFaq = await faqsModels.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
        title_ar: title_ar,
        description_ar: description_ar,
      },
      { new: true }
    );
    res.status(200).json(success(res.statusCode, "Success", { updateFaq }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteFaq = await faqsModels.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteFaq }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.Orderlist = async (req, res) => {
  try {
    const { from, to } = req.body;
    const userOrder = await orderModels
      .find({
        $and: [
          from ? { createdAt: { $gte: new Date(from) } } : {},
          to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
        ],
      })
      .populate(["user_Id", "deliverdBy"]);
    const order = userOrder.filter(
      (x) =>
        x.orderStatus == "Pending" ||
        x.orderStatus == "InProgress" ||
        x.orderStatus == "Cancelled"
    );
    res.status(200).json(success(res.statusCode, "Success", { order }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.adminOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetails = await orderModels.findById(id).populate("user_Id");
    res.status(200).json(success(res.statusCode, "Success", { orderDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.OrderDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteOrder = await orderModels.findByIdAndDelete(id);

    res.status(200).json(success(res.statusCode, "Success", { deleteOrder }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.CompletedOrder = async (req, res) => {
  try {
    const { from, to } = req.body;
    const order = await orderModels
      .find({
        $and: [
          from ? { createdAt: { $gte: new Date(from) } } : {},
          to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
        ],
      })
      .populate("user_Id");
    const CompletedOrder = order.filter((x) => x.orderStatus == "Delivered");
    if (CompletedOrder.length > 0) {
      res
        .status(200)
        .json(success(res.statusCode, "Success", { CompletedOrder }));
    } else {
      res.status(201).json(error("No Data Found", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
