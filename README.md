# BidOut Auction React

### Related Repos 
* [Bidout Auction API With Sanic](https://github.com/kayprogrammer/bidout-auction-v2)
* [Bidout Auction API With Litestar](https://github.com/kayprogrammer/bidout-auction-v3)
* [Bidout Auction API With Django Rest Framework](https://github.com/kayprogrammer/bidout-auction-v4)
* [Bidout Auction API With Django Ninja](https://github.com/kayprogrammer/bidout-auction-v5)
* [Bidout Auction API With FastAPI](https://github.com/kayprogrammer/bidout-auction-v6)
* [Bidout Auction API With Go Fiber](https://github.com/kayprogrammer/bidout-auction-v7)



![alt text](https://github.com/kayprogrammer/bidout-auction-react/blob/main/display/logo.webp?raw=true)


#### React Docs: [Documentation](https://legacy.reactjs.org/docs/getting-started.html)

#### Chakra UI Docs: [Documentation](https://chakra-ui.com/getting-started) 


## How to run locally

* Download this repo or run: 
```bash
    $ git clone git@github.com:kayprogrammer/bidout-auction-react.git
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
    $ docker build -t bidout-auction-react .
    $ docker run -it -p 3000:3000 bidout-auction-react
```
- Docker With Makefile
```bash
    $ make build
    $ make up 
```

<!-- ## Live Urls -->
<!-- #### React Application (Live): [Bidout Auction 2](https://bidout.netlify.app)  -->
<!-- #### API Docs (Live): [Documentation](https://bidout-litestar-api.cleverapps.io)  -->
![alt text](https://github.com/kayprogrammer/bidout-auction-react/blob/main/display/display.png?raw=true)