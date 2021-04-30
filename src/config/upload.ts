import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const fileName = `${fileHash}-${file.originalname}`;

        callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'api-vendas-rm',
    },
  },
} as IUploadConfig;
