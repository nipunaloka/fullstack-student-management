const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const studentRoutes = require('./routes/students');  // Import routes after defining 'app'

dotenv.config();

const app = express();  // Initialize 'app' here before using it
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log("Database connection error:", error));

// Use Routes
app.use('/students', studentRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
