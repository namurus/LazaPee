import db from '@/database';
import axios from 'axios';
import haversine from 'haversine';

// for testing purpose
export const testAPI = async (req, res) => {
    const shopAddress = req.body.shopAddress;
    try {
        // // Get all post office addresses from the database
        // const postOffices = await db.models.PostOffice.findAll();

        // // Geocode shop address to get latitude and longitude using Nominatim
        // const shopGeocode = await getCoordinatesFromAddress(shopAddress);

        // if (!shopGeocode) {
        //     return res.status(404).json({ error: 'Shop address not found' });
        // }

        // const shopLocation = shopGeocode;
        // const nearbyPostOffices = [];

        // for (const post of postOffices) {
        //     const postOfficeGeocode = await getCoordinatesFromAddress(post.officeAddress);
        //     const postOfficeLocation = postOfficeGeocode;

        //     console.log(post.officeAddress,postOfficeLocation);
        //     // Use haversine to calculate the distance
        //     const distance = haversine(shopLocation, postOfficeLocation, { unit: 'km' });
        //     const cost = distance * post.shipCost;

        //     // Check if within 20km
        //     if (distance <= 20) {
        //         nearbyPostOffices.push({ post, cost, distance });
        //     }
        // }

        // res.status(200).json({ nearbyPostOffices });

        shopLocation = await getCoordinatesFromAddress(shopAddress);
        console.log(shopAddress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get nearby shipping options
export const getNearbyShip = async (req, res) => {
    const shopAddress  = req.body.shopAddress;
    console.log(shopAddress);
    try {
        // Get all post office addresses from the database
        const postOffices = await db.models.PostOffice.findAll();

        // Geocode shop address to get latitude and longitude using Nominatim
        const shopLocation = await getCoordinatesFromAddress(shopAddress);

        if (!shopLocation) {
            return res.status(404).json({ error: 'Shop address not found' });
        }

        const nearbyPostOffices = [];

        for (const post of postOffices) {
            const postOfficeLocation = await getCoordinatesFromAddress(post.officeAddress);
            if(!postOfficeLocation) {
                continue;
            }
            // Use haversine to calculate the distance
            const distance = haversine(shopLocation, postOfficeLocation, { unit: 'km' });
            const cost = distance * post.shipCost;
            
            // Check if within 20km
            if (distance <= 20) {
                nearbyPostOffices.push({ post, cost, distance });
            }
        }

        res.status(200).json({ nearbyPostOffices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get nearby post office options to deliver package to that post
export const getNearbyPost = async (req, res) => {
    const shopAddress = req.body.shopAddress;
    const postOffices = await db.models.PostOffice.findAll();
    // Get all post office addresses from database

    try {
        // Geocode shop address to get latitude and longitude using Nominatim
        const shopLocation = await getCoordinatesFromAddress(shopAddress);

        if (!shopLocation) {
            return res.status(404).json({ error: 'Shop address not found' });
        }

        const nearbyPostOffices = [];

        for (const post of postOffices) {
            const postOfficeLocation = await getCoordinatesFromAddress(post.officeAddress);
            if (!postOfficeLocation) {
                continue;
            }
            // Use haversine to calculate the distance
            const distance = haversine(shopLocation, postOfficeLocation, { unit: 'km' });

            // Check if within 10km
            if (distance <= 10) {
                nearbyPostOffices.push({ post, distance });
            }
        }


        res.status(200).json({ nearbyPostOffices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Function to geocode an address using Nominatim API
async function getCoordinatesFromAddress(address) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
        const response = await axios.get(url);

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon),
            };
        } else {
            return null; // Address not found
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        return null;
    }
}
