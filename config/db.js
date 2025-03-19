const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Видаляємо useNewUrlParser і useUnifiedTopology
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Вихід із процесу у разі помилки
  }
};

module.exports = connectDB;
