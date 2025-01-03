import upload from '@/helpers/upload'

export default async (req, res, next) => {
	if (req.files.length > 0) {
		const images = [];
		for (const file of req.files) {
			const result = await upload(file.buffer);
			images.push(result);
		}
		req.body.images = images;
	}else {
	}
	next();
};
