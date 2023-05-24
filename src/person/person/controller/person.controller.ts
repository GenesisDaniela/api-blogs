import { PersonService } from '../service/person.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';


export class PersonController {

    constructor(
        private readonly personService: PersonService = new PersonService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }

    async findAll(_req: Request, res: Response) {
        try {
            const persons = await this.personService.findAll();
            (persons?.length === 0)
                ? this.httpResponse.NotFound(res, `no registered persons yet`)
                : this.httpResponse.Ok(res, persons)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }

    async findOneBy(req: Request, res: Response) {
        try {
            const { term } = req.params
            const person = await this.personService.findOneBy(term);
            (!person)
                ? this.httpResponse.NotFound(res, `person with term ${term} not found`)
                : this.httpResponse.Ok(res, person)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }

    async create(req: Request, res: Response) {
        try {
            await this.personService.create(req.body);
            this.httpResponse.Created(res, `person created successfully`)
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const personUpdate = await this.personService.update(id, req.body);
            (personUpdate.affected === 0)
                ? this.httpResponse.NotFound(res, `person with id ${id} not found`)
                : this.httpResponse.Ok(res, `Person updated successfully`);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const person: DeleteResult = await this.personService.delete(id);
            (person.affected === 0)
                ? this.httpResponse.NotFound(res, `person with id ${id} not found`)
                : this.httpResponse.Ok(res, `person deleted successfully`);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }
    
}