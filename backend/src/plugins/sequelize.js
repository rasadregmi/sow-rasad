import fp from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import ProductModel from '../models/productModel.js';
import NavItemModel from '../models/navItemModel.js';
import NavItemModelSwedish from '../models/navItemModelSwedish.js';
import TermsModel from '../models/termsModel.js';
import TermsModelSwedish from '../models/termsModelSwedish.js';
import dotenv from 'dotenv';
dotenv.config();

const sequelizePlugin = fp(async (fastify, options) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    },
    logging: true // Enable logging for debugging
  });
  
  // Initialize models and store them for easier access
  const Product = ProductModel(sequelize);
  const NavItem = NavItemModel(sequelize);
  const NavItemSwedish = NavItemModelSwedish(sequelize);
  const Terms = TermsModel(sequelize);
  const TermsSwedish = TermsModelSwedish(sequelize);
  
  // Make models accessible via sequelize.models
  sequelize.models = {
    Product,
    NavItem,
    NavItemSwedish,
    terms: Terms,
    termsSweden: TermsSwedish
  };

  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: true });
    fastify.decorate('sequelize', sequelize);
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  }
});

export default sequelizePlugin;