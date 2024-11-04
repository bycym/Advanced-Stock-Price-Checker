# Advanced Stock Price Checker

A simple stock price checker using Express.js, TypeScript, and any free Stock Market API of your choice (e.g., Alpha Vantage, IEX Cloud, or Finnhub). The application should periodically check the prices and calculate the moving average.

## Run with docker compose
```shell
docker compose up -d
```

## Run with npm

pre-requirement to have Redis and a Postgres database. You can run them with docker compose.
```shell
docker compose up db redis -d
```
After that run the application
```shell
npm i
npm run start
```

## To test it

Starts the periodic checks for a given symbol.
```shell
curl -X PUT localhost:3000/api/stock/AAPL
```
Retrieves and displays the current stock price, the last updated time, and the moving average for the given symbol
```shell
curl localhost:3000/api/stock/APPL
```

Invalid symbol check
```shell
curl -X PUT localhost:3000/api/stock/alma
```
