import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
dotenv.config();
import NavItemModelSwedish from '../models/navItemModelSwedish.js';

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

const NavItemSwedish = NavItemModelSwedish(sequelize, DataTypes);

const navItems = [
  "Hem",
  "Beställa",
  "Våra kunder",
  "Om oss",
  "Kontakta oss",
];


async function seedNavItemsSwedish() {
  try {
    await sequelize.sync({ force: true });

    for (const item of navItems) {
      await NavItemSwedish.create({
        label: item,
      });
    }

    console.log('NavItems (Swedish) seeded successfully!');
  } catch (error) {
    console.error('Error seeding NavItems (Swedish):', error);
  } finally {
    await sequelize.close();
  }
}

seedNavItemsSwedish();
