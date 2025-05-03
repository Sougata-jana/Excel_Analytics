const express = require('express');
const cors = require('cors');

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3004', // Allow requests from this origin
    credentials: true // Allow cookies and credentials
}));

app.listen(5000, () => {
    console.log('Server running on port 5000');
});