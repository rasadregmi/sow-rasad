import fp from 'fastify-plugin';
import { Sequelize } from 'sequelize';

const sequelizePlugin = fp(async (fastify, options) => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '@sahitya721',
    database: 'sow',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync(); // ⬅️ Ensures tables are created
    fastify.decorate('sequelize', sequelize); // ⬅️ Now this won't be undefined
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  }
});

export default sequelizePlugin;
