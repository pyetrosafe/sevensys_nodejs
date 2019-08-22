import * as http from 'http'
import * as express from 'express'
import {Request, Response, NextFunction} from 'express'
import * as httpProxy from 'express-http-proxy'
import * as dotenv from 'dotenv'
import * as basicAuth from 'express-basic-auth'

const basicAuthMiddleware = require('../middlewares/basicAuth');

const app = express();
dotenv.config();

const testServiceProxy = httpProxy(`http://localhost:${process.env.TEST_PORT || 3001}`);
const productServiceProxy = httpProxy(`http://localhost:${process.env.PRODUCT_PORT || 3002}`);
const userServiceProxy = httpProxy(`http://localhost:${process.env.USER_PORT || 3003}`);

app.all(['/test', '/test/*']), (req: Request, res: Response, next: NextFunction) => {
    testServiceProxy(req, res, next);
}

app.all(['/product', '/product/*']), (req: Request, res: Response, next: NextFunction) => {
    productServiceProxy(req, res, next);
}

app.all('/user/login', basicAuth({authorizer: basicAuthMiddleware.defaultAuth, authorizeAsync: true}));

app.all(['/user', '/user/*']), (req: Request, res: Response, next: NextFunction) => {
    userServiceProxy(req, res, next);
}

const server= http.createServer(app);
server.listen(process.env.GATEWAY_PORT || 3000);