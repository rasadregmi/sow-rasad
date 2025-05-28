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
    logging: false
  });
  ProductModel(sequelize);
  NavItemModel(sequelize);
  NavItemModelSwedish(sequelize);
  TermsModel(sequelize);
  TermsModelSwedish(sequelize);

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