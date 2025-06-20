require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth'); 
const SubmitForm = require('./models/submitform'); 

const app = express();
const PORT = 5000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected to Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use(cors());
app.use(express.json());


app.use("/api", authRoutes); 


app.post("/api/submit", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const newForm = new SubmitForm({ name, phone, email, password });
    await newForm.save();
    res.status(201).json({ message: "Form submitted & saved successfully!" });
  } catch (err) {
    console.error("Error in /api/submit:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
