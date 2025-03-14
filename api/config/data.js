const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    try {
    const connect = mongoose.connect(process.env.DB_URL);
    console.log('Connection à la base de donnée etablie avec succès');
    } catch (error) {
        console.log("error");
    }
};

module.exports = dbConnect;