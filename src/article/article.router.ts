import { BaseRouter } from "../shared/router/router"
import { ArticleController } from "./controller/article.controller"
import { ArticleMiddleware } from "./middleware/article.middleware"


export class ArticleRouter extends BaseRouter<ArticleController,ArticleMiddleware>{

    constructor() {
        super(ArticleController, ArticleMiddleware)
    }

    routes(): void {

        /*
        * Gets all the people registered in the system
        */
        this.router.get(
            "/article",
            // (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res) => this.controller.findAll(req, res)

        )
        
    }
}