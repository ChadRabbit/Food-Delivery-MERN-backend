const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://mehrasaransh2004:mehrasaransh2004@cluster0.28vihm1.mongodb.net/Tomato?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;

    // Fetch food items
    const foodItemsCollection = db.collection("food_items");
    const foodItems = await foodItemsCollection.find({}).toArray();

    // Fetch food categories
    const foodCategoryCollection = db.collection("food_cateogary");
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    // Set global variables
    global.food_items = foodItems;
    global.food_category = foodCategories;

    console.log("Food items and categories have been set globally.");

  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = mongoDB;
