const { mongo } = require("mongoose");
const  Mongoose  = require("Mongoose");

const dbConnection = async() => {
    try {
        await Mongoose.connect('process.env.DB_CONN', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('db online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }
}

module.exports = {
    dbConnection
}