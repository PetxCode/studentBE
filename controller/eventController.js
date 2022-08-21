const eventModel = require("../model/eventModel");

const getEvents = async (req, res) => {
  try {
    const pix = await eventModel.find({}).sort({ data: "asc" });
    res.status(200).json({ message: "gotten", data: pix });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const pix = await eventModel.findById(req.params.id);
    res.status(200).json({ message: "gotten", data: pix });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, desc, date, month, time, year } = req.body;

    const pix = await eventModel.create({
      title,
      desc,
      date,
      month,
      time,
      year,
    });
    res.status(200).json({ message: "gotten", data: pix });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const editEvent = async (req, res) => {
  try {
    const { title, desc, date, month, time } = req.body;
    const pixID = await eventModel.findById(req.params.id);

    if (pixID) {
      const pix = await eventModel.findByIdAndUpdate(
        req.params.id,
        {
          title,
          desc,
          date,
          month,
          time,
          year,
        },
        { new: true }
      );
      res.status(200).json({ message: "Edited", data: pix });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const doneEvent = async (req, res) => {
  try {
    const pixID = await eventModel.findById(req.params.id);

    if (pixID) {
      const pix = await eventModel.findByIdAndUpdate(
        req.params.id,
        {
          done: true,
        },
        { new: true }
      );
      res.status(200).json({ message: "Edited", data: pix });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const unDoneEvent = async (req, res) => {
  try {
    const pixID = await eventModel.findById(req.params.id);

    if (pixID) {
      const pix = await eventModel.findByIdAndUpdate(
        req.params.id,
        {
          done: false,
        },
        { new: true }
      );
      res.status(200).json({ message: "Edited", data: pix });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const pixID = await eventModel.findById(req.params.id);

    if (pixID) {
      await cloudinary.uploader.destroy(pixID.imageID);

      const pix = await eventModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "deleted", data: pix });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  deleteEvents,
  createEvent,
  getEvent,
  getEvents,
  editEvent,
  unDoneEvent,
  doneEvent,
};
