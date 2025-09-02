const mongoose = require('mongoose');
const url = 'mongodb+srv://d-nexus:nasimkhannk@cluster0.jgytlao.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0';
// asynchronous function - return promise OBJECT
mongoose.connect(url)

.then((result) => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
console.log('another ');

module.exports = mongoose;