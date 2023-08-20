import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private readonly logDirectory = path.join(__dirname, 'logs');
  private readonly logFileName = 'app.log';
  private readonly maxLogFileSize = parseInt(process.env.LOG_FILE_MAX_SIZE, 10);
  private logStream: fs.WriteStream;

  constructor() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }

    const logFilePath = path.join(this.logDirectory, this.logFileName);
    this.logStream = this.initializeLogStream(logFilePath);
  }

  private initializeLogStream(logFilePath: string): fs.WriteStream {
    let fileStats: fs.Stats;

    if (fs.existsSync(logFilePath)) {
      fileStats = fs.statSync(logFilePath);
      if (fileStats.size >= this.maxLogFileSize) {
        // const now = new Date().toISOString();
        // const backupFilePath = path.join(this.logDirectory, `app.${now}.log`);
        // if (this.logStream) {
        //   this.logStream.end();
        // }
        // if (fs.existsSync(logFilePath)) {
        //   fs.renameSync(logFilePath, backupFilePath);
        // }
        // fs.renameSync(logFilePath, backupFilePath);
        // if (fs.existsSync(backupFilePath)) {
        //   fs.unlinkSync(backupFilePath);
        // }
      }
    }

    return fs.createWriteStream(logFilePath, { flags: 'a' });
  }

  log(message: string, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}`;

    console.log(logMessage);

    if (this.logStream) {
      this.writeLog(logMessage);
    }
  }

  error(message: string, error: Error) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [ERROR] ${error.name}: ${error.message} 
      ${error.stack}`;

    console.error(logMessage);

    if (this.logStream) {
      this.writeLog(logMessage);
    }
  }

  private writeLog(logMessage: string) {
    this.logStream.write(logMessage + '\n');
  }
}
