"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const modelfusion_1 = require("modelfusion");
let AppService = class AppService {
    async getHello(res, text) {
        res.setHeader('Content-Type', 'text/event-stream');
        console.log('Got request:', text);
        const textStream = await (0, modelfusion_1.streamText)({
            model: modelfusion_1.ollama
                .CompletionTextGenerator({
                model: 'mistral',
                temperature: 0.7,
            })
                .withTextPrompt(),
            prompt: `You are an expert software engineer. 
      Your job is to explain the text writen by the user. 
      You should not hallucinate or make up any information. 
      Here is the text: ${text}
      `,
        });
        res.write('data: {{start}}\n\n');
        for await (const textPart of textStream) {
            res.write('data: ' + textPart + '\n\n');
        }
        res.write('data: {{end}}\n\n');
        res.status(200).end();
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map