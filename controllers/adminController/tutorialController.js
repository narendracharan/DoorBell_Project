const tutorialModels = require("../../models/adminModels/tutorialScreen");
const { error, success } = require("../../response");

exports.addTutorial = async (req, res) => {
  try {
    const { title_en, title_ar } = req.body;
    if (!title_en) {
      res.status(200).json(error("please provide title", res.statusCode));
    }
    const newTutorials = new tutorialModels({
      title_en: title_en,
      title_ar: title_ar,
    });
    if (req.files) {
      if (req.files[i].fieldname == "tutorialVideo") {
        newTutorials.tutorialVideo.push(req.files[i].fieldname);
      }
      if (req.files[i].fieldname == "tutorialVideoTwo") {
        newTutorials.tutorialVideoTwo.push(req.files[i].fieldname);
      }
    }
    const saveTutorials = await newTutorials.save();
    res.status(200).json(success(res.statusCode, "Success", { saveTutorials }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
