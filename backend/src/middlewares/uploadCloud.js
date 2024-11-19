import upload from '@/helpers/upload'

export default async (req, res, next) => {
  if (req.file) {
    const result = await upload(req.file.buffer);
    req.body[req.file.fieldname] = result;
  }else {
  }
  next();
};
