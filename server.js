const express = require('express');
const connectDB = require('./config/db');
// const path = require('path');

const app = express();
// const wss = new SocketServer({ server });
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json({ msg: 'Route Successful 200' }));

//Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Server static assets in production. If it's in production load a static folder
// if (process.env.NODE_ENV === 'productin') {
//set static folder
//    app.use(express.static('client/build'));

// Route to '*' means get anything other than the above routes (e.g./api/user, /api/contacts/) look for 'index.html' under the client & build folder
//    app.get('*', (req, res) =>
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//    );
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App listening to PORT ${PORT}`));
