const express = require('express');
//const UserRouter = require('./routers/userRouter');
const cors = require('cors');
const app = express();

const port =5000;

//mildwares
app.use(cors({
 // origin: ['http://localhost:3000']
}));

app.use(express.json()); // to parse JSON bodies
//app.use('/user', UserRouter);
// Connect to MongoDB
// require('./connection');


//routers
// app.get('/', (req, res) => {
//     res.send('response from express server');
// });
// add==
// app.get('/add',(req, res) =>{
//     res.send(`resonse from add`);
// });





// starting the  server
app.listen(port, () => {
  console.log(`Server is running on `);
});