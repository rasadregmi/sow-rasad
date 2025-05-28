import { DataTypes } from 'sequelize';

export default function TermsModelSwedish(sequelize) {
  const Terms = sequelize.define("terms_swedish", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Terms;
}
