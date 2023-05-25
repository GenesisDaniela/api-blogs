import express, { Application } from 'express'
import cors from "cors"
import morgan from "morgan"
import { ConfigServer } from "./config/config"
import { PersonRouter } from './person/person/person.router';
import { RoleRouter } from './person/role/role.router';
import { AuthRouter } from './auth/auth.service';
import swaggerUi from 'swagger-ui-express';
import { ArticleRouter } from './article/article.router';
import { FileRouter } from './file/file.router';


class Server extends ConfigServer {
    private readonly app: Application
    private readonly PORT: number

    constructor() {
        super()
        this.app = express()
        this.PORT = this.getNumberEnv("PORT") || 3000
        this.middlewares()
        this.db()
        this.app.use("/api", this.routers())
        this.app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(this.swagger()));
        this.swagger()
        this.listen()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(morgan("dev"))
    }

    routers(): express.Router[] {
        return [
            new AuthRouter().router,
            new PersonRouter().router,
            new RoleRouter().router,
            new ArticleRouter().router,
            new FileRouter().router,
        ]
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port: ${this.PORT} - http://localhost:${this.PORT}`);
        })
    }
}

new Server()