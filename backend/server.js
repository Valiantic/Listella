

const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const Todo = require('./models/todo');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Testing my API");
});

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

sequelize.sync().then({ force: false})
    .then(() => {
        console.log('Database Synced');
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    })
    .catch(err => console.error('Error syncing databases: ', err));

