
# Installation

#### Pre-requisites
Make sure docker and docker-composer are installed on your system

1. Create a `.env` file by copying content of `.env.example`
2. Optionally change `COIN_MARKET_ENV,COIN_MARKET_SECRET_KEY` values in `.env` to point to the coin market's production environment
3. Run  `composer up` in the root directory to start the services, once all services up, open browser and navigate to `http://localhost:4200`
