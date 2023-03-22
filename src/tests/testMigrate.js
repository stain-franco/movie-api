const sequelize = require('../utils/connection');
require("../models/Actors")
require("../models/Genres");
require("../models/Directors");
require("../models/Movies");

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();