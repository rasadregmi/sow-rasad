import Fastify from 'fastify';
import cors from '@fastify/cors';
import sequelizePlugin from './plugins/sequelize.js';
import ProductModel from './models/product.js';
import NavItemModel from './models/navItemsEnglish.js';
import NavItemModelSwedish from './models/navItemsSweden.js';

const fastify = Fastify();

async function start() {
  try {
    await fastify.register(cors, {
      origin: '*',
      methods: ['GET', 'POST'],
    });

    await fastify.register(sequelizePlugin);

    // Products routes
    fastify.get('/products', async (request, reply) => {
      const Product = ProductModel(fastify.sequelize);
      const products = await Product.findAll();
      reply.send(products);
    });

    fastify.post('/products', async (request, reply) => {
      const Product = ProductModel(fastify.sequelize);
      const productData = request.body;
      const products = await Product.bulkCreate(productData);
      reply.status(201).send(products);
    });

    // Nav items routes
    fastify.get('/nav-items', async (request, reply) => {
      const NavItem = NavItemModel(fastify.sequelize);
      const items = await NavItem.findAll();
      reply.send(items);
    });

    fastify.get('/nav-items-swedish', async (request, reply) => {
      const NavItem = NavItemModelSwedish(fastify.sequelize);
      const items = await NavItem.findAll();
      reply.send(items);
    });

    fastify.post('/nav-items', async (request, reply) => {
      const NavItem = NavItemModel(fastify.sequelize);
      const labels = request.body; // expects: ["Home", "About us", ...]

      if (!Array.isArray(labels) || labels.some(l => typeof l !== 'string')) {
        return reply.status(400).send({ error: 'Invalid input format. Expected array of strings.' });
      }

      const navItemData = labels.map(label => ({ label }));
      const createdItems = await NavItem.bulkCreate(navItemData);
      reply.status(201).send(createdItems);
    });

    await fastify.listen({ port: 5000 });
    console.log('🚀 Server running at http://localhost:5000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
