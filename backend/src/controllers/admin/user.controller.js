import db from '@/database';

// [GET] /admin/user
export const getAllUsers = async (req, res) => {
	try {

		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage) || 10;
		const search = req.query.search || '';

		const {rows, count} = await db.models.User.findAndCountAll({
			where: {
				username: {
					[db.Sequelize.Op.like]: `%${search}%`,
				},
			},
			limit: perPage,
			offset: (page - 1) * perPage,
			paranoid: false,
		});

		res.status(200).json({
			users: rows,
			total: count,
			page,
			perPage,
			totalPages: Math.ceil(count / perPage),
			code: 200,
		});
	} catch (error) {
		res.status(500).json({ message: error.message, code: 500 });
	}
};

// [GET] /admin/user/:id
export const getUserById = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const user = await db.models.User.findByPk(id, {
			paranoid: false,
		});
		return res.status(200).json({
			user,
			code: 200,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message, code: 500 });
	}
};

// [GET] /admin/user/permission/:id
export const getPermissionByUserId = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		const user = await db.models.User.findByPk(id);

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
				code: 404,
			});
		}

		const userPermissions = await db.models.User.findByPk(id, {
			attributes: ['id', 'username', 'email', 'phone', 'avatar', 'address'],
			include: [
				{
					model: db.models.AdminPermission,
					as: 'adminPermissions',
					attributes: ['permissionId'],
					include: [
						{
							attributes: ['name'],
							model: db.models.Permission,
							as: 'permission',
						},
					],
				},
			],
		});

		return res.status(200).json({
			userPermissions,
			code: 200,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message, code: 500 });
	}
};

// [POST] /admin/user/permission/:id
export const changePermission = async (req, res) => {
	try {
		const adminId = parseInt(req.params.id);

		// Kiểm tra sự tồn tại của user
		const user = await db.models.User.findByPk(adminId);
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
				code: 404,
			});
		}

		const { permissionIds } = req.body;

		// Lấy danh sách quyền hiện tại của user
		const currentPermissions = await db.models.AdminPermission.findAll({
			where: { adminId },
			attributes: ['id', 'permissionId'],
		});

		// Tách các ID của quyền hiện tại
		const currentPermissionIds = currentPermissions.map((p) => p.permissionId);

		// Các quyền cần xóa (hiện tại có nhưng không nằm trong permissionIds)
		const permissionsToRemove = currentPermissions.filter((p) => !permissionIds.includes(p.permissionId));

		// Các quyền cần thêm (có trong permissionIds nhưng chưa có hiện tại)
		const permissionsToAdd = permissionIds.filter((id) => !currentPermissionIds.includes(id));

		// Xóa các quyền cần xóa
		if (permissionsToRemove.length > 0) {
			const removeIds = permissionsToRemove.map((p) => p.id);
			await db.models.AdminPermission.destroy({
				where: { id: removeIds }, force: true,
			});
		}

		// Thêm các quyền cần thêm
		for (let id of permissionsToAdd) {
			const permission = await db.models.Permission.findByPk(id);
			if (!permission) {
				return res.status(404).json({
					message: `Permission with ID ${id} not found`,
					code: 404,
				});
			}
			await db.models.AdminPermission.create({
				adminId,
				permissionId: id,
			});
		}

		// Lấy lại danh sách quyền sau khi cập nhật
		const userPermissions = await db.models.User.findByPk(adminId, {
			attributes: ['id', 'username', 'email', 'phone', 'avatar', 'address'],
			include: [
				{
					model: db.models.AdminPermission,
					as: 'adminPermissions',
					attributes: ['permissionId'],
					include: [
						{
							attributes: ['name'],
							model: db.models.Permission,
							as: 'permission',
						},
					],
				},
			],
		});

		res.status(200).json({
			message: 'Permissions updated successfully',
			userPermissions,
			code: 200,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message, code: 500 });
	}
};

// [DELETE] /admin/user/:id
export const deleteUser = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const user = await db.models.User.findByPk(id);
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
				code: 404,
			});
		}
		await user.destroy();
		res.status(200).json({
			message: 'User deleted successfully',
			code: 200,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message, code: 500 });
	}
};

// [GET] /admin/user/me
export const getCurrentAdmin = async (req, res) => {
	try {
		const adminId = req.admin.id;

		const admin = await db.models.User.findByPk(adminId, {
			attributes: ['id', 'username', 'email', 'phone', 'avatar', 'address'],
			include: [
				{
					model: db.models.AdminPermission,
					as: 'adminPermissions',
					attributes: ['permissionId'],
					include: [
						{
							attributes: ['name'],
							model: db.models.Permission,
							as: 'permission',
						},
					],
				},
			],
		});

		res.status(200).json({
			admin,
			code: 200,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message, code: 500 });
	}
};
