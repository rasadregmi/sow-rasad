// models/TermsModel.js
import { DataTypes } from 'sequelize';

export default function TermsModel(sequelize) {
  const Terms = sequelize.define("terms", {
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
