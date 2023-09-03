const Covid = require("../model/Covid");
const getAll = async (req, res) => {
  try {
    const covid = await Covid.find();
    return res.send(covid.slice(21250, 21360));
  } catch (error) {
    return res.status(404).send("ErrorOccured");
  }
};

module.exports = { getAll };
