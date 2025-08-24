const mongoose = require('mongoose');
const url = 'mongodb+srv://mmm:mmm@cluster0.gvyon.mongodb.net/mydb234?retryWrites=true&w=majority&appName=Cluster0';
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

