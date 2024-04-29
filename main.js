const express = require('express');

const { Sequelize, sequelize } = require('./db');


const regionsRoutes = require('./routes/route-region');
const provincesRoutes = require('./routes/route-province');
const attractionsRoutes = require('./routes/route-attraction');


const app = express();

app.use(express.json());

app.use("/api", regionsRoutes);
app.use("/api", provincesRoutes);
app.use("/api", attractionsRoutes);




sequelize.sync();



const port = process.env.PORT || 3000 ;
app.listen(port, () => {
    console.log(`http://localhost:${port}...`);
})