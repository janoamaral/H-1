import { Injectable } from '@nestjs/common';
import { streamText, ollama } from 'modelfusion';
import { Response } from 'express';

@Injectable()
export class AppService {
  async getHello(res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
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

    res.write('data: {{start}}\n\n');
    for await (const textPart of textStream) {
      res.write('data: ' + textPart + '\n\n', () => {
        console.count('Sent text part');
      });
    }
    res.write('data: {{end}}\n\n');
  }
}
