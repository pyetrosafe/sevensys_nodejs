import { NextFunction, Request, Response } from "express";
import {StockController} from '../controllers/StockController';

export class stockRoutes {

    public path: String = '/stock';

    public stockController: StockController = new StockController();

    public routes(app): void {

        app.route(`${this.path}/:id`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.stockController.show.bind(this.stockController))

            .put(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.stockController.edit.bind(this.stockController))

            .delete(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.stockController.delete.bind(this.stockController));

        app.route(this.path)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.stockController.index.bind(this.stockController))

            .post(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.stockController.save.bind(this.stockController));
    }
}