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
                            model: db.models.Product,
                            as: 'product',
                            attributes: ['id', 'productName', 'price', 'description', 'thumbnail', 'brand'],
                        },
                    ],
                },
            ],
        });

        const result = {
            id: cart.id,
            products: await Promise.all(cart.cartItems.map(async (cartItem) => ({
                id: cartItem.product.id,
                productName: cartItem.product.productName,
                price: cartItem.product.price,
                description: cartItem.product.description,
                brand: cartItem.product.brand,
                thumbnail: cartItem.product.thumbnail,
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
        const { productId, quantity } = req.body
        const product = await db.models.Product.findOne({
            where: { id: productId },
        })

        if (!product) {
            return res.status(404).json({ code: 404, message: 'Product not found' })
        }

        if (product.stock < quantity) {
            return res.status(400).json({ code: 400, message: 'Not enough stock available' })
        }

        const cart = await db.models.Cart.findOne({
            where: { userId: req.user.id },
        })

        // Kiểm tra xem cart có cartItem nào có productId trùng với req.body.productId không
        const existingCartItem = await db.models.CartItem.findOne({
            where: { cartId: cart.id, productId: productId },
        });

        if (existingCartItem) {
            // Nếu đã tồn tại, cập nhật số lượng
            await existingCartItem.update({ quantity: existingCartItem.quantity + quantity });
            return res.status(200).json(existingCartItem);
        } else {
            // Nếu chưa tồn tại, tạo mới
            const [cartItem, created] = await db.models.CartItem.findOrCreate({
                where: { cartId: cart.id, productId: productId },
                defaults: { quantity, price: product.price },
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

        const product = await db.models.Product.findOne({
            where: { id: cartItem.productId },
        })

        if (!product) {
            return res.status(404).json({ code: 404, message: 'Product not found' })
        }

        if (product.stock < quantity) {
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