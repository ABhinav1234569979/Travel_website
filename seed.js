const mongoose = require("mongoose");
require("dotenv").config();

const Destination = require("./models/Destination");

const destinations = [
  {
    name: "Goa",
    location: "India",
    price: 12000,
    image: "/destinations/goa.jpg",
    description: "Beautiful beaches, nightlife, and water sports for a fun coastal getaway.",
    category: "Beach",
    days: 4,
    rating: 4.5
  },
  {
    name: "Manali",
    location: "Himachal Pradesh, India",
    price: 15000,
    image: "/destinations/manali.jpg",
    description: "Snowy mountains, scenic valleys, and adventure sports in a cool hill setting.",
    category: "Mountains",
    days: 5,
    rating: 4.7
  },
  {
    name: "Kerala",
    location: "India",
    price: 18000,
    image: "/destinations/kerala.jpg",
    description: "Backwaters, greenery, and peaceful houseboat experiences in God’s Own Country.",
    category: "Nature",
    days: 6,
    rating: 4.8
  },
  {
    name: "Jaipur",
    location: "Rajasthan, India",
    price: 14000,
    image: "/destinations/jaipur.jpg",
    description: "Royal palaces, forts, local bazaars, and rich cultural heritage in the Pink City.",
    category: "Heritage",
    days: 4,
    rating: 4.6
  },
  {
    name: "Leh-Ladakh",
    location: "Ladakh, India",
    price: 25000,
    image: "/destinations/leh-ladakh.jpg",
    description: "High-altitude landscapes, mountain passes, monasteries, and unforgettable road trips.",
    category: "Adventure",
    days: 7,
    rating: 4.9
  },
  {
    name: "Andaman",
    location: "Andaman and Nicobar Islands, India",
    price: 28000,
    image: "/destinations/andaman.jpg",
    description: "Crystal-clear water, island hopping, scuba diving, and tropical beach relaxation.",
    category: "Beach",
    days: 5,
    rating: 4.8
  },
  {
    name: "Ooty",
    location: "Tamil Nadu, India",
    price: 13000,
    image: "/destinations/ooty.jpg",
    description: "Tea gardens, cool climate, toy train rides, and beautiful hill station views.",
    category: "Hills",
    days: 4,
    rating: 4.4
  },
  {
    name: "Rishikesh",
    location: "Uttarakhand, India",
    price: 11000,
    image: "/destinations/rishikesh.jpg",
    description: "River rafting, yoga retreats, Ganga aarti, and adventure by the foothills.",
    category: "Adventure",
    days: 3,
    rating: 4.5
  },
  {
    name: "Kashmir",
    location: "Jammu and Kashmir, India",
    price: 22000,
    image: "/destinations/kashmir.jpg",
    description: "Snow-capped peaks, lakes, meadows, and scenic beauty often called paradise on Earth.",
    category: "Scenic",
    days: 6,
    rating: 4.9
  },
  {
    name: "Udaipur",
    location: "Rajasthan, India",
    price: 17000,
    image: "/destinations/udaipur.jpg",
    description: "Lakes, palaces, sunset boat rides, and regal architecture in a romantic setting.",
    category: "Luxury",
    days: 4,
    rating: 4.7
  },
  {
    name: "Coorg",
    location: "Karnataka, India",
    price: 16000,
    image: "/destinations/coorg.jpg",
    description: "Coffee plantations, waterfalls, misty landscapes, and peaceful nature retreats.",
    category: "Nature",
    days: 4,
    rating: 4.6
  },
  {
    name: "Darjeeling",
    location: "West Bengal, India",
    price: 15000,
    image: "/destinations/darjeeling.jpg",
    description: "Tea estates, mountain sunrise views, colonial charm, and cool-weather relaxation.",
    category: "Hills",
    days: 5,
    rating: 4.6
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
