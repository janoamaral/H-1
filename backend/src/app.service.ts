import { Injectable } from '@nestjs/common';
import { streamText, ollama } from 'modelfusion';
import { Response, Request } from 'express';

@Injectable()
export class AppService {
  async getHello(res: Response, text: string) {
    res.setHeader('Content-Type', 'text/event-stream');

    console.log('Got request:', text);
    const textStream = await streamText({
      model: ollama
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
}
