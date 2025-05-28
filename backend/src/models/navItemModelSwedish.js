import { DataTypes } from 'sequelize';


export default function NavItemModelSwedish(sequelize) {
    const NavItemEnglish = sequelize.define("navitemsSweden", {
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
      tableName: "navitemsSweden",
      freezeTableName: true
    });

     return NavItemEnglish;
   };
