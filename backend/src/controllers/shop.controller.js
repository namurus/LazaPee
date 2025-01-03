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

        // Update shop with temporary closure details
        shop.temporaryClosurePeriod = temporaryClosurePeriod;
        shop.temporaryClosureReason = temporaryClosureReason;
        await shop.save();

        res.status(200).json({
            message: 'Shop temporary closure details updated successfully',
            shop: {
                shopId: shop.shopId,
                shopName: shop.shopName,
                temporaryClosurePeriod: shop.temporaryClosurePeriod,
                temporaryClosureReason: shop.temporaryClosureReason,
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
        const { shopId } = req.params; // Shop ID passed as a URL parameter

        // Find the shop
        const shop = await db.models.Shop.findByPk(shopId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Clear temporary closure details
        shop.temporaryClosurePeriod = null;
        shop.temporaryClosureReason = null;
        await shop.save();

        res.status(200).json({
            message: 'Shop temporary closure details cleared successfully',
            shop: {
                shopId: shop.shopId,
                shopName: shop.shopName,
                temporaryClosurePeriod: shop.temporaryClosurePeriod,
                temporaryClosureReason: shop.temporaryClosureReason,
            },
        });
    } catch (error) {
        console.error('Error clearing shop temporary closure:', error);
        next(error);
    }
};
