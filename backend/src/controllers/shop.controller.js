import db from '@/database';

// Controller to set temporary closure for a shop
export const setTemporaryClosure = async (req, res, next) => {
    try {
        const { shopId } = req.params; // Shop ID passed as a URL parameter
        const { temporaryClosurePeriod, temporaryClosureReason } = req.body; // Closure details in request body

        // // Validate temporary closure period
        // if (![1, 2, 3].includes(temporaryClosurePeriod)) {
        //     return res.status(400).json({
        //         message: 'Invalid closure period. Must be 1, 2, or 3 months.',
        //     });
        // }

        // Find the shop
        const shop = await db.models.Shop.findByPk(shopId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

         // Check if the shop is already in a closed state
         if (shop.dateClosed) {
            return res.status(400).json({
                message: `Shop is already in a closed state since ${shop.dateClosed.toISOString().split('T')[0]}.`,
            });
        }

        // Update shop with temporary closure details
        shop.status = 'off';
        shop.temporaryClosurePeriod = temporaryClosurePeriod;
        shop.temporaryClosureReason = temporaryClosureReason;
        shop.dateClosed = new Date();
        await shop.save();

        res.status(200).json({
            message: 'Shop temporary closure details updated successfully',
            shop: {
                shopId: shop.shopId,
                shopName: shop.shopName,
                temporaryClosurePeriod: shop.temporaryClosurePeriod,
                temporaryClosureReason: shop.temporaryClosureReason,
                dateClosed: shop.dateClosed,
            },
        });
    } catch (error) {
        console.error('Error setting shop temporary closure:', error);
        next(error);
    }
};

// Controller to clear temporary closure for a shop
export const clearTemporaryClosure = async (req, res, next) => {
    try {
        const { shopId } = req.params; 

        // Find the shop
        const shop = await db.models.Shop.findByPk(shopId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Check if the shop has been closed for at least 7 days
        const now = new Date();
        const closureDate = new Date(shop.dateClosed);

        if (shop.dateClosed && (now - closureDate) / (1000 * 60 * 60 * 24) < 7) {
            return res.status(400).json({
                message: `The shop cannot be reopened. It has been closed for less than 7 days.`,
            });
        }

        // Clear temporary closure details
        shop.status = 'on';
        shop.temporaryClosurePeriod = null;
        shop.temporaryClosureReason = null;
        shop.dateClosed = null;

        await shop.save();

        res.status(200).json({
            message: 'Shop temporary closure details cleared successfully',
            shop: {
                shopId: shop.shopId,
                shopName: shop.shopName,
                temporaryClosurePeriod: shop.temporaryClosurePeriod,
                temporaryClosureReason: shop.temporaryClosureReason,
                dateClosed: shop.dateClosed,
            },
        });
    } catch (error) {
        console.error('Error clearing shop temporary closure:', error);
        next(error);
    }
};
