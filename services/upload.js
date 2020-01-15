import mongoose from "mongoose";
import Grid from "gridfs-stream";
import GridFsStorage from 'multer-gridfs-storage';
import crypto from'crypto';
import path from 'path';
import multer from 'multer';

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/beeweb_intern',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };

        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

export default class UploadService {
  constructor () {}

  uploadFile(filename) {
    return upload.single(filename);
  }

  async getFile(filename) {
    let file = await gfs.files.findOne({filename});

    if (!file) {
      throw new Error('!file not found');
    }

    return gfs.createReadStream(file.filename);
  }

  removeFile(filename) {
    return gfs.remove({filename, root: 'uploads'});
  }
}
