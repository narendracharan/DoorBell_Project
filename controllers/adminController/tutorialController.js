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
   console.log(req.files);
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
      if (req.files[i].fieldname == "tutorialVideo") {
       // console.log(`${process.env.BASE_URL}/${req.files[i].filename}`);
        newTutorials.tutorialVideo.push(`${process.env.BASE_URL}/${req.files[i].filename}`);
      }
      if (req.files[i].fieldname == "tutorialVideoTwo") {
        newTutorials.tutorialVideoTwo.push(`${process.env.BASE_URL}/${req.files[i].filename}`);
      }
    }
    }
    const saveTutorials = await newTutorials.save();
    res.status(200).json(success(res.statusCode, "Success", { saveTutorials }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.tutorialList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const listData = await tutorialModels.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    });
    res.status(200).json(success(res.statusCode, "Success", { listData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.tutorialUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      title_en: req.body.title_en,
      title_ar: req.body.title_ar,
      tutorialVideo:`${process.env.BASE_URL}/${req.file.filename}`,
      tutorialVideoTwo: `${process.env.BASE_URL}/${req.file.filename}`,
    };
    const updateTOturials = await tutorialModels.findByIdAndUpdate(id, data, {
      new: true,
    });
    res
      .status(200)
      .json(success(res.statusCode, "Success", { updateTOturials }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteTutorilas = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await tutorialModels.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
