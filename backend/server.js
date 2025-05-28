import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import sequelizePlugin from './src/plugins/sequelize.js';
import ProductModel from './src/models/productModel.js';
import NavItemModel from './src/models/navItemModel.js';

// Load environment variables
dotenv.config();

const fastify = Fastify({
  logger: true // Enable logging for better debugging
});

async function start() {
  try {
    await fastify.register(cors, {
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://sow-rasad.vercel.app', 'https://sow-rasad-git-master-rasadregmi.vercel.app'] 
        : ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT'],
      credentials: true
    });

    await fastify.register(sequelizePlugin);

    // Debug route to check if server is running
    fastify.get('/', async (request, reply) => {
      return { status: 'Server is running', routes: ['GET /products', 'GET /terms'] };
    });

    fastify.get('/products', async (request, reply) => {
      try {
        const Product = fastify.sequelize.models.Product;
        console.log('Fetching products...');
        console.log('Product model:', Product ? 'Found' : 'Not found');
        
        if (!Product) {
          return reply.status(500).send({ error: 'Product model not initialized' });
        }
        
        const products = await Product.findAll();
        console.log(`Found ${products.length} products`);
        return reply.send(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        return reply.status(500).send({ error: error.message });
      }
    });
    
    fastify.post('/products', async (request, reply) => {
      try {
        const Product = fastify.sequelize.models.Product;
        if (!Product) {
          return reply.status(500).send({ error: 'Product model not initialized' });
        }
        
        const productData = request.body;
        const products = await Product.bulkCreate(productData);
        return reply.status(201).send(products);
      } catch (error) {
        console.error('Error creating products:', error);
        return reply.status(500).send({ error: error.message });
      }
    });
    
    fastify.put('/products/:id', async (request, reply) => {
      try {
        const Product = fastify.sequelize.models.Product;
        if (!Product) {
          return reply.status(500).send({ error: 'Product model not initialized' });
        }
        
        const { id } = request.params;
        const updateData = request.body;
        
        const [updated] = await Product.update(updateData, {
          where: { id: id }
        });
        
        if (updated) {
          const updatedProduct = await Product.findByPk(id);
          return reply.send(updatedProduct);
        }
        
        return reply.status(404).send({ error: 'Product not found' });
      } catch (error) {
        console.error('Error updating product:', error);
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
    const NavItem = fastify.sequelize.models.NavItem;
    if (!NavItem) {
      return reply.status(500).send({ error: 'NavItem model not initialized' });
    }
    
    const items = await NavItem.findAll();
    return reply.send(items);
  } catch (err) {
    console.error('Error fetching nav items:', err);
    reply.status(500).send({ error: 'Internal server error' });
  }
});

fastify.get('/nav-items-swedish', async (request, reply) => {
  try {
    const NavItemSwedish = fastify.sequelize.models.NavItemSwedish;
    if (!NavItemSwedish) {
      return reply.status(500).send({ error: 'Swedish NavItem model not initialized' });
    }
    
    const items = await NavItemSwedish.findAll();
    return reply.send(items);
  } catch (err) {
    console.error('Error fetching nav items (Swedish):', err);
    reply.status(500).send({ error: 'Internal server error' });
  }
});

fastify.post('/nav-items', async (request, reply) => {
  try {
    const NavItem = fastify.sequelize.models.NavItem;
    if (!NavItem) {
      return reply.status(500).send({ error: 'NavItem model not initialized' });
    }
    
    const labels = request.body;
    
    if (!Array.isArray(labels) || labels.some(l => typeof l !== 'string')) {
      return reply.status(400).send({ error: 'Invalid input format. Expected array of strings.' });
    }
    
    const navItemData = labels.map(label => ({ label }));
    const createdItems = await NavItem.bulkCreate(navItemData);
    return reply.status(201).send(createdItems);
  } catch (error) {
    console.error('Error creating nav items:', error);
    return reply.status(500).send({ error: error.message });
  }
});

    await fastify.listen({
      port: process.env.PORT || 3001, 
      host: '0.0.0.0',               
    });
    console.log(`🚀 Server running on port ${process.env.PORT || 3001}`);
  } catch (err) {
    console.error('Server error:', err);
    process.exit(1);
  }
}

start();