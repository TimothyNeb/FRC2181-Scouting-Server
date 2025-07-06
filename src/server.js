const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json);

app.post("/submit-form", verifyToken, (req, res) => {
    const formData = req.body;

    const filePath = path.join(__dirname, "data", "submission.json");
    fs.appendFileSync(filePath, JSON.stringify(fromData) + "\n");

    res.status(200).json({ message: "Form submittedd successfully!"});

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});