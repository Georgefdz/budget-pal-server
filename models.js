const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE, 
  process.env.PG_USER, 
  process.env.PG_PASSWORD, 
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT || 5432,
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      // connectTimeout: 60000
    }
  }
);

const Expense = sequelize.define('Expense', {
  concept: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: "#00587D",
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  }, {
    timestamps: false,
  });

sequelize.sync({ alter: true })
.then(() => console.log('Database synchronized'))
.catch(err => console.error('Database synchronization error:', err));


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = {
  Expense,
}