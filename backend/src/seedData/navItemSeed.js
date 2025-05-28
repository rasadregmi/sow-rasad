import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
dotenv.config();
import NavItemModel from '../models/navItemModel.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: false
});

const NavItemEnglish = NavItemModel(sequelize, DataTypes);

const navItems = [
  "Home",
  "Order",
  "Our Customers",
  "About us",
  "Contact us",
];

async function seedNavItems() {
  try {
    await sequelize.sync({ force: true });

    for (const item of navItems) {
      await NavItemEnglish.create({
        label: item,
      });
    }

    console.log('NavItems (English) seeded successfully!');
  } catch (error) {
    console.error('Error seeding NavItems (English):', error);
  } finally {
    await sequelize.close();
  }
}

seedNavItems();