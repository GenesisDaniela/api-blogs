import { PersonService } from "../../person/person/service/person.service"
import { HttpResponse } from "../../shared/response/http-response"
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware {

    private httpResponse: HttpResponse
    private personService: PersonService

    constructor() {
        this.httpResponse = new HttpResponse()
        this.personService = new PersonService()
    }

    async existPerson(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body
        const person = await this.personService.findOneByEmail(email)
        if (!person) {
            return this.httpResponse.NotFound(res, `There is no person with email ${email}`)
        }
        next()
    }
}