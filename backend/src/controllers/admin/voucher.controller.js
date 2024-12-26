import db from '@/database';

// [POST] /admin/voucher/create

export const createVoucher = async (req, res) => { 
	try {
		const { code, discount, startDate, endDate, quantity } = req.body;
		const existedVoucher = await db.models.Voucher.findOne({ where: { code } });

		if (existedVoucher) {
			return res.status(400).json({ code: 400, message: 'Voucher existed' });
		}

		const voucher = await db.models.Voucher.create({
			code,
			discount,
			startDate,
			endDate,
			quantity,
			status: true,
		});
		return res.status(201).json({
			code: 201,
			message: 'Voucher created',
			data: voucher,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ code: 500, message: 'Internal server error' });
	}
}

// [PATCH] /admin/voucher/update/:id
export const updateVoucher = async (req, res) => {
	try {
		const { id } = req.params;
		const { code, discount, startDate, endDate, quantity, status } = req.body;

		const voucher = await db.models.Voucher.findOne({ where: { id } });

		if (!voucher) {
			return res.status(404).json({code: 404, message: 'Voucher not found'});
		}

		await voucher.update({
			code,
			discount,
			startDate,
			endDate,
			quantity,
			status,
		});

		return res.status(200).json({code: 200, message: 'Voucher updated', data: voucher});
	} catch (error) {
		res.status(500).json({code: 500, message: 'Internal server error'});
	}
}

// [DELETE] /admin/voucher/delete/:id
export const deleteVoucher = async (req, res) => {
	try {
		const { id } = req.params;

		const voucher = await db.models.Voucher.findOne({ where: { id } });

		if (!voucher) {
			return res.status(404).json({code: 404, message: 'Voucher not found'});
		}

		await voucher.destroy();

		return res.status(204).json({
			code: 204,
			message: 'Voucher deleted',
		});
	} catch (error) {
		res.status(500).json({code: 500, message: 'Internal server error'});
	}
}

// [GET] /admin/voucher
export const getVouchers = async (req, res) => {
	try {
		const vouchers = await db.models.Voucher.findAll();

		return res.status(200).json(vouchers);
	} catch (error) {
		res.status(500).json({code: 500, message: 'Internal server error'});
	}
}
