const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '66ed4c00062c7ece6b6d798b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dbzbbhhxa/image/upload/v1727094400/YelpCamp/ince7euu1irdyvu6tpuq.jpg',
                    filename: 'YelpCamp/ince7euu1irdyvu6tpuq'
                },
                {
                    url: 'https://res.cloudinary.com/dbzbbhhxa/image/upload/v1727094399/YelpCamp/eu2w8uc0bsfecqvtwmzk.png',
                    filename: 'YelpCamp/eu2w8uc0bsfecqvtwmzk'
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est asperiores odit id amet. Enim et eveniet doloremque nam possimus similique quos molestiae alias sint. Officia praesentium quaerat dicta dolore eaque.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


//image: `https://picsum.photos/400?random=${Math.random()}`