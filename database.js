const colors = require('colors');
const { Sequelize, DataTypes, BOOLEAN } = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('twitch', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: msg => console.log(msg.magenta)
});
async function run() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
run()
const account = sequelize.define('account', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    proxy: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: DataTypes.STRING
        , unique: true
    },
    email: {
        type: DataTypes.STRING,

    },
    pass: {
        type: DataTypes.STRING,
    },
    follow: {
        type: DataTypes.BOOLEAN,
    },
}, {
    freezeTableName: true
});

const proxies = sequelize.define('proxies', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ip: {
        type: DataTypes.STRING,

    },
    user: {
        type: DataTypes.STRING,

    },
    pass: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
});


proxies.sync({ alter: true })
account.sync({ alter: true })

exports.account = account
exports.proxies = proxies