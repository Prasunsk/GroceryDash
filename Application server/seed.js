const mongoose = require('mongoose');
const config = require('config');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      // options if needed
    });
    console.log('MongoDB Connected for seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedProducts = [
  {
    name: 'Whole Milk',
    description: 'Fresh whole milk, 1 L',
    price: 525,
    category: 'Dairy',
    imageURL: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=500&fit=crop',
    stock: 50,
    warehouseLocation: { x: 10, y: 20, warehouseName: 'Main Hub' }
  },
  {
    name: 'Chicken Breast',
    description: 'Boneless skinless chicken breast, 500 g',
    price: 1200,
    category: 'Meat',
    imageURL: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop',
    stock: 20,
    warehouseLocation: { x: 25, y: 35, warehouseName: 'Main Hub' }
  },
  {
    name: 'Orange Juice',
    description: 'Fresh orange juice, 2 L',
    price: 675,
    category: 'Beverages',
    imageURL: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop',
    stock: 40,
    warehouseLocation: { x: 70, y: 80, warehouseName: 'Main Hub' }
  },
  {
    name: 'Salmon Fillet',
    description: 'Fresh salmon fillet, 500 g',
    price: 1949,
    category: 'Meat',
    imageURL: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 15,
    warehouseLocation: { x: 27, y: 37, warehouseName: 'Main Hub' }
  },
  {
    name: 'Whole Wheat Pasta',
    description: 'Whole wheat spaghetti, 500 g',
    price: 525,
    category: 'Grains',
    imageURL: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop',
    stock: 35,
    warehouseLocation: { x: 45, y: 55, warehouseName: 'Main Hub' }
  },
  {
    name: 'Pork Chops',
    description: 'Fresh pork chops, 750 g pack',
    price: 1499,
    category: 'Meat',
    imageURL: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&h=500&fit=crop',
    stock: 18,
    warehouseLocation: { x: 28, y: 38, warehouseName: 'Main Hub' }
  },
  {
    name: 'Black Pepper',
    description: 'Ground black pepper, 100 g',
    price: 375,
    category: 'Spices',
    imageURL: 'https://images.unsplash.com/photo-1532333452003-8c47de139d38?w=500&h=500&fit=crop',
    stock: 80,
    warehouseLocation: { x: 90, y: 100, warehouseName: 'Main Hub' }
  },
  {
    name: 'Apples',
    description: 'Red apples, 1 kg bag',
    price: 375,
    category: 'Fruits',
    imageURL: 'https://images.unsplash.com/photo-1560806887-1195db711ee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 55,
    warehouseLocation: { x: 40, y: 50, warehouseName: 'Main Hub' }
  },
  {
    name: 'White Rice',
    description: 'Long grain white rice, 2 kg bag',
    price: 600,
    category: 'Grains',
    imageURL: 'https://images.unsplash.com/photo-1586190936828-cd3c3a337285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 60,
    warehouseLocation: { x: 30, y: 40, warehouseName: 'Main Hub' }
  },
  {
    name: 'Potato Chips',
    description: 'Classic potato chips, 150 g',
    price: 449,
    category: 'Snacks',
    imageURL: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 50,
    warehouseLocation: { x: 80, y: 90, warehouseName: 'Main Hub' }
  },
  {
    name: 'Cheddar Cheese',
    description: 'Cheddar cheese block, 250 g',
    price: 750,
    category: 'Dairy',
    imageURL: 'https://images.unsplash.com/photo-1589985643862-16ce0c41485b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 25,
    warehouseLocation: { x: 50, y: 60, warehouseName: 'Main Hub' }
  },
  {
    name: 'Broccoli',
    description: 'Fresh broccoli crown, approx. 400 g',
    price: 375,
    category: 'Vegetables',
    imageURL: 'https://images.unsplash.com/photo-1577003833010-b30d77a1d2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 40,
    warehouseLocation: { x: 60, y: 70, warehouseName: 'Main Hub' }
  },
  {
    name: 'Turmeric Powder',
    description: 'Pure turmeric powder, 100 g',
    price: 450,
    category: 'Spices',
    imageURL: 'https://images.unsplash.com/photo-1596040016601-f5d1a3a1a09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 70,
    warehouseLocation: { x: 91, y: 101, warehouseName: 'Main Hub' }
  },
  {
    name: 'Bananas',
    description: 'Fresh bananas, bunch of 5 (approx. 800 g)',
    price: 299,
    category: 'Fruits',
    imageURL: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop',
    stock: 60,
    warehouseLocation: { x: 41, y: 51, warehouseName: 'Main Hub' }
  },
  {
    name: 'Tomatoes',
    description: 'Vine-ripened tomatoes, 500 g pack',
    price: 300,
    category: 'Vegetables',
    imageURL: 'https://images.unsplash.com/photo-1592924357228-91a4daadcccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 50,
    warehouseLocation: { x: 55, y: 65, warehouseName: 'Main Hub' }
  },
  {
    name: 'Bottled Water',
    description: 'Purified water, 24 x 500 ml pack',
    price: 599,
    category: 'Beverages',
    imageURL: 'https://images.unsplash.com/photo-1554866585-92ef168f7881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 100,
    warehouseLocation: { x: 71, y: 81, warehouseName: 'Main Hub' }
  },
  {
    name: 'Granola Bars',
    description: 'Honey granola bars, 5-pack (200 g)',
    price: 525,
    category: 'Snacks',
    imageURL: 'https://images.unsplash.com/photo-1590974765699-95ca0e8d1dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 40,
    warehouseLocation: { x: 81, y: 91, warehouseName: 'Main Hub' }
  },
  {
    name: 'Eggs',
    description: 'Dozen large eggs, approx. 700 g',
    price: 675,
    category: 'Dairy',
    imageURL: 'https://images.unsplash.com/photo-1578325473183-61e3194cfb47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 45,
    warehouseLocation: { x: 35, y: 45, warehouseName: 'Main Hub' }
  },
  {
    name: 'Ground Beef',
    description: 'Lean ground beef, 500 g',
    price: 1125,
    category: 'Meat',
    imageURL: 'https://images.unsplash.com/photo-1603052891726-36bfd957e2af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 25,
    warehouseLocation: { x: 26, y: 36, warehouseName: 'Main Hub' }
  },
  {
    name: 'Cumin Seeds',
    description: 'Whole cumin seeds, 100 g',
    price: 413,
    category: 'Spices',
    imageURL: 'https://images.unsplash.com/photo-1604552183885-bdc2e4c3e0dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 65,
    warehouseLocation: { x: 92, y: 102, warehouseName: 'Main Hub' }
  },
  {
    name: 'Bread',
    description: 'Whole wheat bread loaf, 500 g',
    price: 375,
    category: 'Grains',
    imageURL: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 30,
    warehouseLocation: { x: 31, y: 41, warehouseName: 'Main Hub' }
  },
  {
    name: 'Oranges',
    description: 'Navel oranges, 1 kg bag',
    price: 525,
    category: 'Fruits',
    imageURL: 'https://images.unsplash.com/photo-1581284537314-40c3a5be5b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 50,
    warehouseLocation: { x: 42, y: 52, warehouseName: 'Main Hub' }
  },
  {
    name: 'Carrots',
    description: 'Fresh carrots, 1 kg bag',
    price: 225,
    category: 'Vegetables',
    imageURL: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop',
    stock: 45,
    warehouseLocation: { x: 61, y: 71, warehouseName: 'Main Hub' }
  },
  {
    name: 'Apple Juice',
    description: 'Pure apple juice, 2 L',
    price: 525,
    category: 'Beverages',
    imageURL: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop',
    stock: 35,
    warehouseLocation: { x: 72, y: 82, warehouseName: 'Main Hub' }
  },
  {
    name: 'Almonds',
    description: 'Roasted salted almonds, 250 g',
    price: 899,
    category: 'Snacks',
    imageURL: 'https://images.unsplash.com/photo-1585707734193-bfab46a6ee9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 35,
    warehouseLocation: { x: 82, y: 92, warehouseName: 'Main Hub' }
  },
  {
    name: 'Greek Yogurt',
    description: 'Plain Greek yogurt, 1 kg',
    price: 749,
    category: 'Dairy',
    imageURL: 'https://images.unsplash.com/photo-1505252585461-04db1267ae5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 30,
    warehouseLocation: { x: 12, y: 22, warehouseName: 'Main Hub' }
  },
  {
    name: 'Cinnamon Sticks',
    description: 'Ceylon cinnamon sticks, 50 g',
    price: 675,
    category: 'Spices',
    imageURL: 'https://images.unsplash.com/photo-1596040016601-f5d1a3a1a09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 50,
    warehouseLocation: { x: 93, y: 103, warehouseName: 'Main Hub' }
  },
  {
    name: 'Oatmeal',
    description: 'Rolled oats, 1 kg',
    price: 450,
    category: 'Grains',
    imageURL: 'https://images.unsplash.com/photo-1585518667556-0e4b90c47ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 40,
    warehouseLocation: { x: 32, y: 42, warehouseName: 'Main Hub' }
  },
  {
    name: 'Strawberries',
    description: 'Fresh strawberries, 500 g',
    price: 749,
    category: 'Fruits',
    imageURL: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&h=500&fit=crop',
    stock: 25,
    warehouseLocation: { x: 43, y: 53, warehouseName: 'Main Hub' }
  },
  {
    name: 'Bell Peppers',
    description: 'Assorted bell peppers, 3-pack (approx. 500 g)',
    price: 525,
    category: 'Vegetables',
    imageURL: 'https://images.unsplash.com/photo-1599599810875-d5b1f5f86ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 35,
    warehouseLocation: { x: 62, y: 72, warehouseName: 'Main Hub' }
  },
  {
    name: 'Iced Tea',
    description: 'Iced tea, 6 x 500 ml bottles',
    price: 749,
    category: 'Beverages',
    imageURL: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop',
    stock: 45,
    warehouseLocation: { x: 73, y: 83, warehouseName: 'Main Hub' }
  },
  {
    name: 'Pretzels',
    description: 'Mini salted pretzels, 150 g',
    price: 375,
    category: 'Snacks',
    imageURL: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 45,
    warehouseLocation: { x: 83, y: 93, warehouseName: 'Main Hub' }
  },
  {
    name: '2% Reduced Fat Milk',
    description: '2% low-fat milk, 2 L',
    price: 488,
    category: 'Dairy',
    imageURL: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=500&fit=crop',
    stock: 40,
    warehouseLocation: { x: 11, y: 21, warehouseName: 'Main Hub' }
  },
  {
    name: 'Turkey Breast',
    description: 'Sliced turkey breast, 500 g',
    price: 1199,
    category: 'Meat',
    imageURL: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop',
    stock: 22,
    warehouseLocation: { x: 29, y: 39, warehouseName: 'Main Hub' }
  },
  {
    name: 'Paprika',
    description: 'Smoked paprika powder, 100 g',
    price: 488,
    category: 'Spices',
    imageURL: 'https://images.unsplash.com/photo-1596040016601-f5d1a3a1a09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 60,
    warehouseLocation: { x: 94, y: 104, warehouseName: 'Main Hub' }
  },
  {
    name: 'Cereal',
    description: 'Multi-grain cereal, 500 g box',
    price: 599,
    category: 'Grains',
    imageURL: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 35,
    warehouseLocation: { x: 33, y: 43, warehouseName: 'Main Hub' }
  },
  {
    name: 'Grapes',
    description: 'Green seedless grapes, 1 kg bag',
    price: 599,
    category: 'Fruits',
    imageURL: 'https://images.unsplash.com/photo-1585365647862-0c7cf68399d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 35,
    warehouseLocation: { x: 44, y: 54, warehouseName: 'Main Hub' }
  },
  {
    name: 'Spinach',
    description: 'Fresh baby spinach, 200 g pack',
    price: 450,
    category: 'Vegetables',
    imageURL: 'https://images.unsplash.com/photo-1535080145351-867e3200fceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 30,
    warehouseLocation: { x: 63, y: 73, warehouseName: 'Main Hub' }
  },
  {
    name: 'Coffee',
    description: 'Premium ground coffee, 350 g',
    price: 1199,
    category: 'Beverages',
    imageURL: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 30,
    warehouseLocation: { x: 74, y: 84, warehouseName: 'Main Hub' }
  },
  {
    name: 'Trail Mix',
    description: 'Fruit and nut trail mix, 250 g',
    price: 749,
    category: 'Snacks',
    imageURL: 'https://images.unsplash.com/photo-1585707734193-bfab46a6ee9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 30,
    warehouseLocation: { x: 84, y: 94, warehouseName: 'Main Hub' }
  },
  {
    name: 'Mozzarella',
    description: 'Fresh mozzarella ball, 250 g',
    price: 675,
    category: 'Dairy',
    imageURL: 'https://images.unsplash.com/photo-1589985643862-16ce0c41485b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 20,
    warehouseLocation: { x: 13, y: 23, warehouseName: 'Main Hub' }
  },
  {
    name: 'Shrimp',
    description: 'Large frozen shrimp, 500 g',
    price: 2249,
    category: 'Meat',
    imageURL: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
    stock: 12,
    warehouseLocation: { x: 30, y: 40, warehouseName: 'Main Hub' }
  },
  {
    name: 'Dried Oregano',
    description: 'Dried oregano herb, 30 g',
    price: 338,
    category: 'Spices',
    imageURL: 'https://images.unsplash.com/photo-1596040016601-f5d1a3a1a09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 75,
    warehouseLocation: { x: 95, y: 105, warehouseName: 'Main Hub' }
  },
  {
    name: 'Brown Rice',
    description: 'Brown rice, 1 kg bag',
    price: 525,
    category: 'Grains',
    imageURL: 'https://images.unsplash.com/photo-1586190936828-cd3c3a337285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 55,
    warehouseLocation: { x: 34, y: 44, warehouseName: 'Main Hub' }
  },
  {
    name: 'Avocados',
    description: 'Ripe Hass avocados, 3-pack',
    price: 525,
    category: 'Fruits',
    imageURL: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop',
    stock: 40,
    warehouseLocation: { x: 20, y: 30, warehouseName: 'Main Hub' }
  },
  {
    name: 'Cucumbers',
    description: 'Fresh cucumbers, 3-pack',
    price: 300,
    category: 'Vegetables',
    imageURL: 'https://images.unsplash.com/photo-1663867076959-c1a4ffa0766e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 38,
    warehouseLocation: { x: 64, y: 74, warehouseName: 'Main Hub' }
  },
  {
    name: 'Almond Milk',
    description: 'Unsweetened almond milk, 2 L',
    price: 525,
    category: 'Beverages',
    imageURL: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 35,
    warehouseLocation: { x: 75, y: 85, warehouseName: 'Main Hub' }
  },
  {
    name: 'Cheese Crackers',
    description: 'Cheddar cheese crackers, 175 g',
    price: 449,
    category: 'Snacks',
    imageURL: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500&h=500',
    stock: 48,
    warehouseLocation: { x: 85, y: 95, warehouseName: 'Main Hub' }
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    console.log('Cleared existing products');

    await Product.insertMany(seedProducts);
    console.log('Seeded 48 products successfully');

    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedDB();
});
