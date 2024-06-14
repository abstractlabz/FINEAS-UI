# Fineas-UI
## Web app interface for Fineas.AI

Fineas-UI is a typescript next.js  

LLM powered investment researcher web-app (mobile client soon!)

- GPT4o powered inferences
- Polygon.io financial data
- Google news data
- ✨Proprietary webscrapers✨

## Features

- Up to date analysis summaries across major categories
- Up to date financial chatbot
- Discord bot integration (coming soon!)
- Portfolio optimization (coming soon!)

## Tech Stack

Fineas uses a number of open source projects to work properly:

- [Golang] - For handling the ETL service
- [Flask] - For setting up the LLM and RAG services
- [Langchain] - Popular library to connect to OpenAI services
- [Pinecone] - Vector database to store vectors for LLM knowledge base
- [MongoDB] - Flexible No-SQL database for fast and simple I/O
- [GPT-4o] - Highest quality LLM that exists to date
- [Polygon.io] - Reliable financial data API that supports streaming data via WSS
- [Akash] - Blockchain based docker hosting platform

## Installation

Fineas requires [Python](https://www.python.org/) 3.9+, [Golang](https://go.dev/) 1.21.6+, and Docker to locally run.

Install the required languages in order to get started

Now fork and clone the repo

```sh
git clone https://github.com/abstractlabz/FINEAS.git
```

Cd into the root directory and build from root...

```sh
cd FINEAS
docker build -t fineas-image:[<VERSION#>] .
```

Now go to your local hosts file and add these entries
**For Windows go to this directory and open the file:
```sh
C:/Windows/System32/Drivers/etc/hosts
```

Now add these DNS entries to the bottom:

```sh
127.0.0.1 data.fineasapp.io
127.0.0.1 query.fineasapp.io
127.0.0.1 upgrade.fineasapp.io
127.0.0.1 webhook.fineasapp.io
```

Run the docker image on your local machine 
**contact core team for dev level environment variables

```sh
docker run -d -p 8443:8035 -p 443:6002 -p 2087:6001 -p 2083:7000 -p 2096:7002 -e API_KEY=[API_KEY] -e PASS_KEY=[PASS_KEY] -e MONGO_DB_LOGGER_PASSWORD=[MONGO_DB_LOGGER_PASSWORD] -e OPEN_AI_API_KEY=[OPEN_AI_API_KEY] -e KB_WRITE_KEY=[KB_WRITE_KEY] -e MR_WRITE_KEY=[MR_WRITE_KEY] -e PINECONE_API_KEY=[PINECONE_API_KEY] -e STRIPE_ENDPOINT_SECRET=[STRIPE_ENDPOINT_SECRET] -e STRIPE_SECRET_KEY=[STRIPE_SECRET_KEY] -e REDIRECT_DOMAIN=https://fineas.ai fineas-image:[<VERSION#>]
```

**Note: These entries must only be used in a development environment. Comment out these entries using '#' to access Fineas' production level domains  

## API Spec

Now you can locally interact with Fineas using http requests or any hosted front-end

| Description | Request Example |
| ------ | ------ |
| Collects aggregated data for a given ticker symbol.| curl "http://0.0.0.0:8080/?ticker=AMZN"
| Processes a prompt and returns relevant financial information. | curl -X POST "https://query.fineasapp.io:443/chat?prompt=What%20is%20some%20relevant%20news%20around%20amazon%3F"
| Retrieve the entire current cache of information for a ticker | curl -X GET "http://data.fineasapp.io:8443/ret?ticker=AAPL" -H "Authorization: Bearer [Access Token]" 
| Collect recent technical analysis data for a ticker. | curl -X GET "http://0.0.0.0:8089/ta?ticker=AAPL" -H "Authorization: Bearer [Access Token]"
| Collect recent description data for a ticker | curl -X GET "http://0.0.0.0:8084/desc?ticker=AAPL" -H "Authorization: Bearer [Access Token]" |
| Collect recent news data for a ticker | curl -X GET "http://0.0.0.0:8083/news?ticker=AAPL" -H "Authorization: Bearer [Access Token]" |
| Collect recent financial data for a ticker | curl -X GET "http://0.0.0.0:8082/fin?ticker=AAPL" -H "Authorization: Bearer [Access Token]" |
| Collect recent stock data for a ticker | curl -X GET "http://0.0.0.0:8081/stk?ticker=AAPL" -H "Authorization: Bearer [Access Token]" 


## License

GPL 2.0

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Golang]: <https://go.dev/>
   [Flask]: <https://flask.palletsprojects.com/en/3.0.x/>
   [Langchain]: <https://www.langchain.com/>
   [Pinecone]: <https://www.pinecone.io/>
   [MongoDB]: <https://www.mongodb.com/products/platform/atlas-database>
   [GPT-4o]: <https://openai.com/index/hello-gpt-4o/>
   [Polygon.io]: <https://polygon.io/>
   [Akash]: <https://akash.network/>

# Fineas-UI
## Web app interface for Fineas.AI
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, fork and clone the repo
```sh
git clone https://github.com/abstractlabz/FINEAS-UI.git
```

In the root directory, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Netlify

Fineas-UI uses netlify CICD pipelines to deploy the latest pull request to origin/new-ui 

**contact core team members for access to Netlify team access.

Check out [Netlify](https://app.netlify.com) for more details about deployment.
