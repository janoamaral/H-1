import { AppService } from './app.service';
import { Request, Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    re: Response;
    getAiRequest(req: Request): void;
    sendData(res: Response): void;
}
