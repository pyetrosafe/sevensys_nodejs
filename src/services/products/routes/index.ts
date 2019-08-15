// src/services/products/routes/index.ts
import {Request, Response, NextFunction} from "express";
import {CategoryController} from '../controllers/CategoryController';
import {ProductController} from '../controllers/ProductController';

export class productsRoutes{

    public path: String = '/product';

    public categoryController: CategoryController = new CategoryController();
    public productController: ProductController = new ProductController();

    public routes(app): void {

        // Routes for Category
        app.route(`${this.path}/category/:id`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.categoryController.show.bind(this.categoryController))

            .put(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.categoryController.edit.bind(this.categoryController))

            .delete(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.categoryController.delete.bind(this.categoryController));

        app.route(`${this.path}/category`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.categoryController.index.bind(this.categoryController))

            .post(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.categoryController.save.bind(this.categoryController));

        // Routes for Product
        app.route(`${this.path}/:id`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.productController.show.bind(this.productController))

            .put(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.productController.edit.bind(this.productController))

            .delete(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.productController.delete.bind(this.productController));

        app.route(this.path)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.productController.index.bind(this.productController))
            .post(async (req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.productController.save.bind(this.productController));
    }
}