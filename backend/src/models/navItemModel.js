import { DataTypes } from 'sequelize';

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
    }, {
      freezeTableName: true
    });

    return NavItemEnglish;
  };
