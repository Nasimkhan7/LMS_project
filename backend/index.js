const express = require('express');
const feesRouter = require('./Routes/feeRoutes');
const registrationRouter = require('./Routes/registrationRoutes');
const cors = require('cors');
const { use } = require('react');
const app = express();

const port =5000;

//mildwares
app.use(cors({
  origin: ['http://localhost:3000']
}));

// to parse incoming requests with JSON payloads
app.use(express.json()); // to parse JSON bodies
app.use('/fee', feesRouter);
app.use('/registration', registrationRouter);
app.use('/user',userRouter);

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