const mongoose = require("mongoose");
require("dotenv").config();

const Destination = require("./models/Destination");

const destinations = [
  {
    name: "Goa",
    location: "India",
    price: 12000,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    description: "Beautiful beaches, nightlife, and water sports.",
    category: "Beach",
    days: 4,
    rating: 4.5
  },
  {
    name: "Manali",
    location: "Himachal Pradesh, India",
    price: 15000,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    description: "Snowy mountains, adventure activities, and scenic views.",
    category: "Mountains",
    days: 5,
    rating: 4.7
  },
  {
    name: "Kerala",
    location: "India",
    price: 18000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    description: "Backwaters, greenery, and peaceful houseboat stays.",
    category: "Nature",
    days: 6,
    rating: 4.8
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Destination.deleteMany();
    await Destination.insertMany(destinations);
    console.log("Sample destinations inserted");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedData();
