const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const Connected = require('./db')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

Connected();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Arifur is Running");
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


