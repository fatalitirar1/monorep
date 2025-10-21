const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

console.log("Frontend server started");

app.get('/ping-backend', async (req, res) => {
    try {
        const response = await axios.get('http://localhost/api/ping');
        res.send(response.data);
    } catch (error) {
        console.error("Error calling backend:", error.message);
        res.status(500).send('Cannot reach backend');
    }
});

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
});


