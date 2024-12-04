import db from '../config/connection.js';
import cleanDB from './cleanDB.js';
import { Drink, User } from '../models/index.js'

//create seeding for user and drink database and then create routes.
import drinkData from './drink-seed.json' assert{ type: 'json'};
import userData from './user-seed.json' assert{ type: 'json'};

try {
    await db();
    await cleanDB();
  
    // bulk create each model
    await Drink.insertMany(drinkData);
    await User.insertMany(userData);
  
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }