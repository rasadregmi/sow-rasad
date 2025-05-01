// models/TermsModel.js
import { DataTypes } from 'sequelize';

export default function TermsModelSwedish(sequelize) {
  const Terms = sequelize.define("termsSwedish", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Terms;
}
