import fp from 'fastify-plugin';
import { Sequelize } from 'sequelize';

const sequelizePlugin = fp(async (fastify, options) => {
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
