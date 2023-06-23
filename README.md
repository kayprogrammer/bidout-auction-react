# BidOut Auction React 2

#### Related Repo - [Bidout Auction API With Litestar](https://github.com/kayprogrammer/bidout-auction-v3)
#### This repo is same as [Bidout Auction React](https://github.com/kayprogrammer/bidout-auction-react). But guest users was handled differently.

![alt text](https://github.com/kayprogrammer/bidout-auction-react2/blob/main/display/logo.webp?raw=true)


#### React Docs: [Documentation](https://legacy.reactjs.org/docs/getting-started.html)

#### Chakra UI Docs: [Documentation](https://chakra-ui.com/getting-started) 


## How to run locally

* Download this repo or run: 
```bash
    $ git clone git@github.com:kayprogrammer/bidout-auction-react2.git
```

#### In the root directory:
- Install all dependencies
```bash
    $ npm install
```
- Create an `.env` file and copy the contents from the `.env.example` to the file and set the respective values.

- Run Locally
```bash
    $ npm start
```

#### With Docker
- Docker Direct
```bash
    $ docker build -t bidout-auction-react2 .
    $ docker run -it -p 3000:3000 bidout-auction-react2
```
- Docker With Makefile
```bash
    $ make build
    $ make up 
```

## Live Urls
#### React Application (Live): [Bidout Auction 2](https://bidout2.netlify.app) 
#### API Docs (Live): [Documentation](https://bidout-litestar-api.cleverapps.io) 
![alt text](https://github.com/kayprogrammer/bidout-auction-react/blob/main/display/display.png?raw=true)