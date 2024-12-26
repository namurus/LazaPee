import db from '@/database';

// [GET] /voucher
export const getAllVouchers = async (req, res) => {
	try {
		const user = req.user;
		const usedVoucherIds = await db.models.UserVoucher.findAll({
			where: { userId: user.id },
			attributes: ['voucherId'],
		}).then((rows) => rows.map((row) => row.voucherId));

		const unusedVouchers = await db.models.Voucher.findAll({
			where: {
				status: true,
				id: {
					[db.Sequelize.Op.notIn]: usedVoucherIds,
				},
			},
			order: [['createdAt', 'DESC']],
		});

		return res.status(200).json({
			code: 200,
			message: 'voucher list',
			data: unusedVouchers,
		});
	} catch (error) {
		return res.status(500).json({
			code: 500,
			message: error.message,
		});
	}
};

// [GET] /voucher/check
export const checkVoucher = async (req, res) => {
	try {
		const { code } = req.query;
		const user = req.user;
		const voucher = await db.models.Voucher.findOne({ where: { code } });
		if (!voucher) {
			return res.status(404).json({ code: 404, message: 'Voucher not found' });
		}
		const now = new Date();
		if (now < voucher.startDate || now > voucher.endDate) {
			return res.status(400).json({ code: 400, message: 'Voucher is not available yet' });
		}
		if (voucher.status === false || voucher.quantity === 0) {
			return res.status(400).json({ code: 400, message: 'Voucher is not available' });
		}
		const userVoucher = await db.models.UserVoucher.findOne({
			where: { userId: user.id, voucherId: voucher.id },
		});
		if (userVoucher) {
			return res.status(400).json({ code: 400, message: 'Voucher has been used' });
		}
		return res.status(200).json({
			code: 200,
			message: 'Voucher is available',
			data: voucher,
		});
	} catch (error) {}
};

// [POST] /voucher/apply
export const applyVoucher = async (req, res) => {
	try {
		const { code } = req.body;
		const user = req.user;
		const voucher = await db.models.Voucher.findOne({ where: { code } });
		if (!voucher) {
			return res.status(404).json({ code: 404, message: 'Voucher not found' });
		}
		const now = new Date();
		if (now < voucher.startDate || now > voucher.endDate) {
			return res.status(400).json({ code: 400, message: 'Voucher is not available yet' });
		}
		if (voucher.status === false || voucher.quantity === 0) {
			return res.status(400).json({ code: 400, message: 'Voucher is not available' });
		}
		const userVoucher = await db.models.UserVoucher.findOne({
			where: { userId: user.id, voucherId: voucher.id },
		});
		if (userVoucher) {
			return res.status(400).json({ code: 400, message: 'Voucher has been used' });
		}
		await db.models.UserVoucher.create({
			userId: user.id,
			voucherId: voucher.id,
		});
		voucher.quantity -= 1;
		if (voucher.quantity === 0) {
			voucher.status = false;
		}
		await voucher.save();
		return res.status(200).json({
			code: 200,
			message: 'Voucher applied successfully',
		});
	} catch (error) {}
};
