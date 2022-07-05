const { DataTypes, sequelize, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {

    id: {
      type: Sequelize.UUID,
      defaultvalue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    Vida: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0
    },

    Fuerza: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0,
    },

    Defensa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0,
    },

    Velocidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0,
    },

    Altura: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0,
    },

    Peso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0,
    },

    createdInDb: { // me va a servir para llamar unicamente a los pokemon creados por mi 
      type: DataTypes.BOOLEAN,
      defaultvalue: true, // todos los que yo cree en mi db van a setearse con la propiedad createdInDt
      allowNull: true,
    },

    Image: {
      type: DataTypes.STRING,
      allowNull: true,

    }

  });
};






