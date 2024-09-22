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
    async getHello(res) {
        const textStream = await (0, modelfusion_1.streamText)({
            model: modelfusion_1.ollama
                .CompletionTextGenerator({
                model: 'mistral',
                temperature: 0.7,
            })
                .withTextPrompt(),
            prompt: "Generate a text based on the following prompt: 'Hello brave new world'.",
        });
        for await (const textPart of textStream) {
            res.write(textPart);
        }
        return res.status(200).end();
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map