import db from '@/database';

export const fetchAllCartItems = async (req, res, next) => {
    try {
        const cart = await db.models.Cart.findOne({
            where: { userId: req.user.id }, 
            attributes: ['id'],
            include: [
                {
                    model: db.models.CartItem,
                    as: 'cartItems',
                    attributes: ['quantity'],
                    include: [
                        {
                            model: db.models.Skus,
                            as: 'sku',
                            attributes: ['price', 'attributeName', 'value', 'stock_quantity'],
                            include: [
                                {
                                    model: db.models.Product,
                                    as: 'product',
                                    attributes: ['id', 'productName', 'brand', 'description', 'thumbnail'],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        const result = {
            id: cart.id,
            products: await Promise.all(cart.cartItems.map(async (cartItem) => ({
                id: cartItem.sku.product.id,
                productName: cartItem.sku.product.productName,
                price: cartItem.sku.price,
                attributeName: cartItem.sku.attributeName,
                stock_quantity: cartItem.sku.stock_quantity,
                value: cartItem.sku.value,
                description: cartItem.sku.product.description,
                brand: cartItem.sku.product.brand,
                thumbnail: cartItem.sku.product.thumbnail,
                quantity: cartItem.quantity,
                total: await cartItem.getTotal(),
                discountedTotal: await cartItem.getDiscountedTotal()
            }))),
            total: await cart.getTotal(),
            discountedTotal: await cart.getDiscountedTotal(),
            userId: req.user.id,
            totalProducts: await cart.getTotalProducts(),
        };
        res.status(200).json(result);

    } catch (err) {
        return next(err)
    }
}

export const addCartItem = async (req, res, next) => {
    try {
        const { skusId, quantity } = req.body
        const skus = await db.models.Skus.findOne({
            where: { id: skusId },
        })

        if (!skus) {
            return res.status(404).json({ code: 404, message: 'Product not found' })
        }

        if (skus.stock_quantity < quantity) {
            return res.status(400).json({ code: 400, message: 'Not enough stock available' })
        }

        const cart = await db.models.Cart.findOne({
            where: { userId: req.user.id },
        })

        // Kiểm tra xem cart có cartItem nào có productId trùng với req.body.productId không
        const existingCartItem = await db.models.CartItem.findOne({
            where: { cartId: cart.id, skusId: skusId },
        });

        if (existingCartItem) {
            // Nếu đã tồn tại, cập nhật số lượng
            await existingCartItem.update({ quantity: existingCartItem.quantity + quantity });
            return res.status(200).json(existingCartItem);
        } else {
            // Nếu chưa tồn tại, tạo mới
            const [cartItem, created] = await db.models.CartItem.findOrCreate({
                where: { cartId: cart.id, skusId: productId },
                defaults: { quantity, price: skus.price },
            });

            res.status(201).json(cartItem);
        }
    } catch (err) {
        next(err);
    }
}

export const updateCartItem = async (req, res, next) => {
    try {
        const { cartItemId, quantity } = req.body
        const cartItem = await db.models.CartItem.findOne({
            where: { id: cartItemId },
        })

        if (!cartItem) {
            return res.status(404).json({ code: 404, message: 'Cart item not found' })
        }

        const skus = await db.models.Skus.findOne({
            where: { id: cartItem.skusId },
        })

        if (!skus) {
            return res.status(404).json({ code: 404, message: 'Product not found' })
        }

        if (skus.stock_quantity < quantity) {
            return res.status(400).json({ code: 400, message: 'Not enough stock available' })
        }

        await cartItem.update({ quantity })

        return res.status(200).json(cartItem)
    } catch (err) {
        next(err)
    }
}

export const deleteCartItem = async (req, res, next) => {
    try {
        const cart = await db.models.Cart.findOne({
            where: { userId: req.user.id },
        })

        if (!cart) {
            return res.status(404).json({ code: 404, message: 'Cart not found' })
        }

        const cartItem = await db.models.CartItem.findOne({
            where: { id: req.body.cartItemId, cartId: cart.id },
        })

        if (!cartItem) {
            return res.status(404).json({ code: 404, message: 'Cart item not found' })
        }

        await cartItem.destroy()

        return res.status(204).end()

    } catch (err) {
        next(err)
    }
}