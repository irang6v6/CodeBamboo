import { Bucket, Storage } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { parse } from 'path';

@Injectable()
export class CloudStorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      keyFilename:'./src/core/services/strategic-cacao-386913-af7bcc9d39b2.json'
    });
    this.bucket = this.storage.bucket('codebamboo-img-bucket');
  }

  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination.replace(/^\.+/g, '').replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    // console.log('destination? : ', escDestination)
    return escDestination;
  }

  private setFilename(nickname): string {
    // const fileName = parse(uploadedFile.originalname);
    return `profileImg-${nickname}-${Date.now()}`.replace(/^\.+/g, '').replace(/^\/+/g, '').replace(/\r|\n/g, '_');
  }

  async uploadFile(nickname, uploadedFile, destination: string): Promise<any> {
    const fileName = this.setDestination(destination) + this.setFilename(nickname);
    const file = this.bucket.file(fileName);
    // console.log('스토리지의 파일 : ', file)
    try {
      await file.save(uploadedFile.buffer, { contentType: uploadedFile.mimetype });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return { ...file.metadata, publicUrl: `https://storage.googleapis.com/${this.bucket.name}/${file.name}` };
  }

  async removeFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);
    try {
      await file.delete();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}