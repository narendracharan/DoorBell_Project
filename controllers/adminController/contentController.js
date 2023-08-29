const contentSchema = require("../../models/adminModels/contentModels");
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
