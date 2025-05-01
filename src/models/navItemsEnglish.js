import { DataTypes } from 'sequelize';

// models/navitemsEnglish.js
export default function NavItemModel(sequelize) {
    const NavItemEnglish = sequelize.define("navitemsEnglish", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return NavItemEnglish;
  };
  
