const express = require('express');
const connectDB = require('./config/db');

const app = express();
// const wss = new SocketServer({ server });
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Route Successful 200' }));

//Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App listening to PORT ${PORT}`));
