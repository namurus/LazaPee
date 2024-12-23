import db from '@/database';
import axios from 'axios';
import haversine from 'haversine';

export const getNearbyPost = async (req, res) => {
    const { shopAddress, postOfficeAddresses } = req.body;

    if (!shopAddress || !Array.isArray(postOfficeAddresses)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        // Geocode shop address to get latitude and longitude using Nominatim
        const shopGeocode = await getCoordinatesFromAddress(shopAddress);

        if (!shopGeocode) {
            return res.status(404).json({ error: 'Shop address not found' });
        }

        const shopLocation = shopGeocode;

        // Calculate distances to all post offices
        const nearbyPostOffices = [];
        for (const address of postOfficeAddresses) {
            const postOfficeGeocode = await getCoordinatesFromAddress(address);
            if (!postOfficeGeocode) continue;

            const postOfficeLocation = postOfficeGeocode;

            // Use haversine to calculate the distance
            const distance = haversine(shopLocation, postOfficeLocation, { unit: 'km' });
            console.log(shopLocation, postOfficeLocation);
            console.log(`Distance to ${address}: ${distance}m`);
            // Check if within 3km
            if (distance <= 3000) {
                nearbyPostOffices.push({ address, distance });
            }
        }

        res.status(200).json({ nearbyPostOffices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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
