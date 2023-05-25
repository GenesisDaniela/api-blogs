import { HttpResponse } from "../../shared/response/http-response";
import { ArticleService } from "../service/article.service";
import { Request, Response } from 'express';

export class ArticleController {

    constructor(
        private readonly articleService: ArticleService = new ArticleService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }
    async findAll(_req: Request, res: Response) {
        try {
            const articles = await this.articleService.findAll();
            (articles?.length === 0)
                ? this.httpResponse.NotFound(res, `no registered persons yet`)
                : this.httpResponse.Ok(res, articles)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }

}