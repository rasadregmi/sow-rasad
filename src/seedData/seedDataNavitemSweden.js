import { Sequelize, DataTypes } from 'sequelize';
import NavItemModelSwedish from '../models/navItemsSweden.js';


const sequelize = new Sequelize('postgresql://sow_4k5u_user:ptLJEsX3xiLZ7qRt33XJ0Q8GzwcrOfFW@dpg-d09sb8s9c44c73cmlkr0-a.singapore-postgres.render.com/sow_4k5u', {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    },
    logging: false
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
