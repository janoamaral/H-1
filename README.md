# H-1

Minimal web interface for LLMs. Its name refers to [Hustler-One](https://armoredcore.fandom.com/wiki/Nine-Ball),as I'm a long time fan of AC series. Built on top of NestJS, Vue, Docker and [ModelFusion](https://modelfusion.dev/).

## The Whys

The rationale behind this project is that I wanted to centralize all the AI-related answers. Currently, I have to switch between Edge Copilot if I'm browsing, Ollama in the terminal, and if I use any other LLM provider, I just have to go to their sites/interfaces... With my very own personalized Linux setup, it just... breaks my flow. So the requirements were:

- Need a single place where I pass a query.
- Works primarily with Ollama, multiple providers optional.
- Redirect the LLM response to a UI.

I was unable to find a project that fit those, so I built my own.

- NestJS exposes a local POST endpoint where any HTTP client can send requests.
- The response is then sent via SSE to any web client connected.

This way, I can have an open browser tab with the H-1 web UI and then send messages using rofi and pipe it through curl.

## Demo

https://github.com/user-attachments/assets/a8d68357-1ad8-4285-8b94-04357146aefe


## Projec Status

Reached MVP status, with some rough edges, but it's (usually) usable. For the time being, as the project is for personal usage, there is a great deal bugs and lack of features. I hope more people find it interesting and helps to the development.  

## Develop

- Clone this repo
- Go to the tools directory
- Run `sudo docker compose --env-file ./envs/base.env up`
- Have fun

The backend runs on http://localhost:9000 and the frontend on http://localhost:5173
