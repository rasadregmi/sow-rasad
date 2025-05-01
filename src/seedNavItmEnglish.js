import { Sequelize, DataTypes } from 'sequelize';
import NavItemModel from './models/navItemsEnglish.js';


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '@sahitya721',
  database: 'sow',
});

const NavItemEnglish = NavItemModel(sequelize, DataTypes);

const navItems = [
  "Home",
  "Order",
  "Our Customers",
  "About us",
  "Contact us",
];

const navItemData = navItems.map(label => ({ label }));

async function seedNavItems() {
  try {
    await sequelize.sync({ force: false }); // Set force: true only if you want to drop & recreate the table
    await NavItemEnglish.bulkCreate(navItemData);
    console.log('Nav items seeded successfully.');
  } catch (error) {
    console.error('Error seeding nav items:', error);
  } finally {
    await sequelize.close();
  }
}

seedNavItems();
