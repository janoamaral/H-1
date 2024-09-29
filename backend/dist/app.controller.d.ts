import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(res: Response): Promise<void>;
    sendData(res: Response): void;
}
