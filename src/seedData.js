import { Sequelize } from 'sequelize';
import ProductModel from './models/product.js';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '@sahitya721',
  database: 'sow',
});

const Product = ProductModel(sequelize);

const productData = [
    {
      articleNo: "1234567890",
      name: "Wireless Bluetooth Headphones",
      inPrice: 8999,
      price: 14999,
      unit: "pieces",
      inStock: 500,
      description: "High-quality sound with noise cancellation feature",
    },
    {
      articleNo: "0987654321",
      name: "Smartphone 64GB",
      inPrice: 19999,
      price: 25999,
      unit: "pieces",
      inStock: 300,
      description: "Latest model with a sleek design and powerful processor",
    },
    {
      articleNo: "1112223334",
      name: "4K Ultra HD Smart TV",
      inPrice: 25000,
      price: 35000,
      unit: "pieces",
      inStock: 100,
      description: "55-inch 4K smart TV with built-in streaming apps",
    },
    {
      articleNo: "2233445566",
      name: "Bluetooth Speaker",
      inPrice: 1999,
      price: 2999,
      unit: "pieces",
      inStock: 200,
      description: "Portable Bluetooth speaker with 12-hour battery life",
    },
    {
      articleNo: "3344556677",
      name: "Laptop 15.6\" i7 16GB RAM",
      inPrice: 45000,
      price: 60000,
      unit: "pieces",
      inStock: 150,
      description: "Powerful laptop for work, gaming, and entertainment",
    },
    {
      articleNo: "4455667788",
      name: "Wireless Keyboard and Mouse Combo",
      inPrice: 1500,
      price: 2500,
      unit: "sets",
      inStock: 800,
      description: "Ergonomic wireless keyboard and mouse for efficient work",
    },
    {
      articleNo: "5566778899",
      name: "Smartwatch with Fitness Tracker",
      inPrice: 4999,
      price: 7499,
      unit: "pieces",
      inStock: 600,
      description: "Track your fitness goals and receive notifications directly on your wrist",
    },
    {
      articleNo: "6677889900",
      name: "External Hard Drive 1TB",
      inPrice: 3500,
      price: 5500,
      unit: "pieces",
      inStock: 400,
      description: "Portable 1TB hard drive for secure data storage",
    },
    {
      articleNo: "7788990011",
      name: "Gaming Console Bundle",
      inPrice: 24999,
      price: 34999,
      unit: "sets",
      inStock: 50,
      description: "Complete gaming console bundle with controllers and games",
    },
    {
      articleNo: "8899001122",
      name: "Noise-Cancelling Earbuds",
      inPrice: 3500,
      price: 5999,
      unit: "pieces",
      inStock: 700,
      description: "Comfortable noise-canceling earbuds with great sound quality",
    },
    {
      articleNo: "9900112233",
      name: "Electric Scooter",
      inPrice: 18999,
      price: 25999,
      unit: "pieces",
      inStock: 100,
      description: "Eco-friendly electric scooter with a top speed of 25km/h",
    },
    {
      articleNo: "1011121314",
      name: "Portable Air Conditioner",
      inPrice: 12000,
      price: 18000,
      unit: "pieces",
      inStock: 150,
      description: "Compact air conditioner perfect for home or office use",
    },
    {
      articleNo: "2021222324",
      name: "Electric Coffee Grinder",
      inPrice: 1200,
      price: 2000,
      unit: "pieces",
      inStock: 450,
      description: "Grind your coffee beans to perfection with this electric grinder",
    },
    {
      articleNo: "3031324344",
      name: "Cordless Vacuum Cleaner",
      inPrice: 8999,
      price: 12999,
      unit: "pieces",
      inStock: 250,
      description: "Lightweight and powerful cordless vacuum cleaner for home use",
    },
    {
      articleNo: "4041425354",
      name: "Air Fryer 5L",
      inPrice: 3500,
      price: 5000,
      unit: "pieces",
      inStock: 350,
      description: "Cook crispy food with little to no oil using this air fryer",
    },
    {
      articleNo: "5051526364",
      name: "Electric Kettle 1.5L",
      inPrice: 800,
      price: 1500,
      unit: "pieces",
      inStock: 1000,
      description: "Fast boiling electric kettle with automatic shut-off feature",
    },
    {
      articleNo: "6061627374",
      name: "Digital Camera 16MP",
      inPrice: 12000,
      price: 17000,
      unit: "pieces",
      inStock: 200,
      description: "Capture clear photos and videos with this 16MP digital camera",
    },
    {
      articleNo: "7071728384",
      name: "Portable Power Bank 20,000mAh",
      inPrice: 2500,
      price: 4000,
      unit: "pieces",
      inStock: 800,
      description: "High-capacity power bank to keep your devices charged on the go",
    },
    {
      articleNo: "8081829394",
      name: "Smart Door Lock",
      inPrice: 8000,
      price: 12000,
      unit: "pieces",
      inStock: 150,
      description: "Keyless entry smart door lock with remote access capabilities",
    },
    {
      articleNo: "9091920404",
      name: "LED Desk Lamp with Wireless Charger",
      inPrice: 1500,
      price: 2500,
      unit: "pieces",
      inStock: 600,
      description: "LED desk lamp with built-in wireless charging pad",
    },
    {
      articleNo: "1010101010",
      name: "Home Theater System 5.1",
      inPrice: 15000,
      price: 22000,
      unit: "pieces",
      inStock: 120,
      description: "Surround sound 5.1 system for an immersive movie experience",
    },
  ];

async function seed() {
  try {
    await sequelize.sync({ force: true });
    await Product.bulkCreate(productData);
    console.log('Seeded data successfully');
  } catch (err) {
    console.error('Failed to seed data:', err);
  } finally {
    await sequelize.close();
  }
}

seed();
