import AppClass from "../../app.class";
import {productsRoutes} from "./routes";

const routes = new productsRoutes();

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.config();
    }
}

export default new App(routes).app;