import Fastify from 'fastify';
import cors from '@fastify/cors';
import sequelizePlugin from './src/plugins/sequelize.js';
import ProductModel from './src/models/productModel.js';
import NavItemModel from './src/models/navItemModel.js';

const fastify = Fastify();

async function start() {
  try {
    await fastify.register(cors, {
  origin: ['https://sow-rasad.vercel.app/terms', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT'],
    });

    await fastify.register(sequelizePlugin);

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
    
    fastify.put('/products/:id', async (request, reply) => {
      const Product = ProductModel(fastify.sequelize);
      const { id } = request.params;
      const updateData = request.body;
      
      try {
        const [updated] = await Product.update(updateData, {
          where: { id: id }
        });
        
        if (updated) {
          const updatedProduct = await Product.findByPk(id);
          return reply.send(updatedProduct);
        }
        
        return reply.status(404).send({ error: 'Product not found' });
      } catch (error) {
        return reply.status(500).send({ error: error.message });
      }
    });

    fastify.get('/terms', async (request, reply) => {
  try {
    const termItem = fastify.sequelize.models.terms;
    const items = await termItem.findAll();
    return reply.send(items);
  } catch (err) {
    console.error('Error fetching terms:', err);
    reply.status(500).send({ error: 'Internal server error' });
  }
});

fastify.get('/terms-swedish', async (request, reply) => {
  try {
    const termItem = fastify.sequelize.models.terms_swedish;
    const items = await termItem.findAll();
    reply.send(items);
  } catch (err) {
    console.error('Error fetching terms (Swedish):', err);
    reply.status(500).send({ error: 'Unable to fetch terms (Swedish)' });
  }
});

fastify.get('/nav-items', async (request, reply) => {
  try {
    const NavItem = NavItemModel(fastify.sequelize);
    const items = await NavItem.findAll();
    return reply.send(items);
  } catch (err) {
    console.error('Error fetching nav items:', err);
    reply.status(500).send({ error: 'Internal server error' });
  }
});

fastify.get('/nav-items-swedish', async (request, reply) => {
  try {
    const NavItem = fastify.sequelize.models.navitemsSweden;
    const items = await NavItem.findAll();
    return reply.send(items);
  } catch (err) {
    console.error('Error fetching nav items (Swedish):', err);
    reply.status(500).send({ error: 'Internal server error' });
  }
});

fastify.post('/nav-items', async (request, reply) => {
  const NavItem = NavItemModel(fastify.sequelize);
  const labels = request.body;

  if (!Array.isArray(labels) || labels.some(l => typeof l !== 'string')) {
    return reply.status(400).send({ error: 'Invalid input format. Expected array of strings.' });
  }

  const navItemData = labels.map(label => ({ label }));
  const createdItems = await NavItem.bulkCreate(navItemData);
  reply.status(201).send(createdItems);
});

    await fastify.listen({
      port: process.env.PORT || 3001, 
      host: '0.0.0.0',               
    });
    console.log('🚀 Server running at http://localhost:3001');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();