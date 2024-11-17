const express = require("express");
const cors = require("cors");

const { sequelize } = require("./lib/index.lib");
const { masterModel } = require("./models/master.model");
const { detailsModel } = require("./models/details.model");

const app = express();

app.use(cors());
app.use(express.json());

// Creating DB
app.get("/seed_db", (req, res) => {
  sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
  });
});

// categories api
app.get("/v1/api/categories", async (req, res) => {
  try {
    const categories = await masterModel.findAll();
    if (!categories) {
      return res.status(400).json({ message: "Categories not found" });
    }
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/v1/api/categories", async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await masterModel.create({ category_name });

    if (!category) {
      return res.status(400).json({ message: "Category has not added" });
    }
    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Questions
app.get("/v1/api/questions", async (req, res) => {
  try {
    const questions = await detailsModel.findAll({
      include: {
        model: masterModel,
        attributes: ["category_name"],
      },
    });

    if (questions.length === 0) {
      return res.status(404).json({ message: "Questions, NOT FOUND" });
    }
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/v1/api/questions", async (req, res) => {
  try {
    const { question_text, master_id } = req.body;

    const master = await masterModel.findByPk(master_id);
    if (!master) {
      return res
        .status(400)
        .json({ error: `Category with id ${master_id} does not exist` });
    }

    const question = await detailsModel.create({ question_text, master_id });

    if (!question) {
      return res.status(404).json({ message: "Question, has Not Added" });
    }
    res.status(201).json({ question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/v1/api/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await detailsModel.findByPk(id);

    if (!question)
      return res.status(404).json({ message: "Question not found" });

    if (req.body.question_text) {
      question.question_text = req.body.question_text;
    }

    if (req.body.master_id) {
      question.master_id = req.body.master_id;
    }
    await question.save();
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/v1/api/questions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const question = await detailsModel.findOne({ where: { id } });

    if (!question)
      return res.status(404).json({ message: "Question not found" });

    await question.destroy();

    res.status(200).json({ message: "Question deletion success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
