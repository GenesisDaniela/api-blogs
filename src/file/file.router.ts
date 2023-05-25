import multer from "multer";
import { BaseRouter } from "../shared/router/router"
import { FileController } from "./controller/file.controller";
import { FileMiddleware } from "./middleware/file.middleware";

const upload = multer();

export class FileRouter extends BaseRouter<FileController,FileMiddleware>{

    constructor() {
        super(FileController, FileMiddleware)
    }

    routes(): void {

        /*
        * Gets all the people registered in the system
        */
        this.router.post(
            "/file",
            upload.single('fileName'),
            // (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res) => this.controller.upload_file(req, res)
        )
    }
}