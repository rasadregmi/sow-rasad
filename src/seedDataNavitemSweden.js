import { Sequelize, DataTypes } from 'sequelize';
import NavItemModelSwedish from './models/navItemsSweden.js';


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '@sahitya721',
  database: 'sow',
});

const NavItemEnglish = NavItemModelSwedish(sequelize, DataTypes);

const navItems = [
  "Hem",
  "Beställa",
  "Våra kunder",
  "Om oss",
  "Kontakta oss",
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
