import { Injectable } from '@nestjs/common';
import path from 'node:path';
import fs from 'node:fs';

@Injectable()
export class LoggingService {
  private logFilePath: string;
  private logStream: fs.WriteStream;

  constructor() {
    const logDir = 'logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    const logFileName = `app_${new Date().toISOString().slice(0, 10)}.log`;
    this.logFilePath = path.join(logDir, logFileName);
    this.logStream = fs.createWriteStream(this.logFilePath, { flags: 'a' });
  }

  log(message: string, level = 'info') {
    const now = new Date().toISOString();
    const logMessage = `${now} [${level.toUpperCase()}] ${message}`;
    console.log(logMessage);
    this.writeLog(logMessage);
  }

  error(message: string, error: Error) {
    const now = new Date().toISOString();
    const logMessage = `${now} [ERROR] ${message}
      ${error.name}: ${error.message}
      ${error.stack}`;
    console.error(logMessage);
    this.writeLog(logMessage);
  }

  private writeLog(logMessage: string) {
    this.logStream.write(logMessage + '\n');
  }
}
