import { Injectable } from '@nestjs/common';
import { streamText, ollama } from 'modelfusion';

@Injectable()
export class AppService {
  async getHello(res: any) {
    const textStream = await streamText({
      model: ollama
        .CompletionTextGenerator({
          model: 'mistral',
          temperature: 0.7,
        })
        .withTextPrompt(),
      prompt:
        "Generate a text based on the following prompt: 'Hello brave new world'.",
    });

    for await (const textPart of textStream) {
      res.write(textPart);
    }

    return res.status(200).end();
  }
}
