
import { ArticleEntity } from '../entity/article.entity';
import { BaseService } from '../../config/base.service';

export class ArticleService extends BaseService<ArticleEntity>{

    constructor(
        ) {
        super(ArticleEntity)
    }

    async findAll(): Promise<ArticleEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("article")
                .select([
                    "article",
                ])
                .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    // async findOneById(id: string): Promise<PersonEntity | null> {
    //     try {
    //         // return (await this.execRepository).findOneBy({ id })
    //         return (await this.execRepository)
    //             .createQueryBuilder("person")
    //             .leftJoinAndSelect("person.role", "role")
    //             .where("person.id = :id", {id})
    //             .getOne()
    //     } catch (error: any) {
    //         throw new Error(error.message);
    //     }
    // }

    // async findOneByEmail(email: string): Promise<PersonEntity | null> {
    //     try {
    //         return (await this.execRepository)
    //             .createQueryBuilder("person")
    //             .addSelect("person.password")
    //             .where({ email })
    //             .getOne()
    //     } catch (error: any) {
    //         throw new Error(error)
    //     }
    // }

    // async findOneBy(term: string): Promise<PersonEntity | null> {
    //     try {
    //         return (await this.execRepository)
    //             .createQueryBuilder("person")
    //             .leftJoin("person.role", "role")
    //             .where(
    //                 ` 
    //                 person.email = :term`,
    //                 { term })
    //             .select([
    //                 "person",
    //                 "role.name"
    //             ])
    //             .getOne()
    //     } catch (error: any) {
    //         throw new Error(error)
    //     }
    // }

    // async create(person: PersonDTO): Promise<PersonEntity> {
    //     try {
    //         const role = await this.roleService.findById(person.role_id)
    //         if (role) {
    //             const newPerson = (await this.execRepository).create(person)
    //             newPerson.password = await bcrypt.hash(newPerson.password, 10)
    //             newPerson.role = role
    //             return (await this.execRepository).save(newPerson)
    //         } else {
    //             throw new Error(`verify role`)
    //         }
    //     } catch (error: any) {
    //         throw new Error(error)
    //     }
    // }

    // async update(id: string, body: UpdatePersonDTO): Promise<UpdateResult> {
    //     try {
    //         return (await this.execRepository).update(id, body)
    //     } catch (error: any) {
    //         throw new Error(error)
    //     }
    // }

    // async delete(id: string): Promise<UpdateResult> {
    //     try {
    //         return (await this.execRepository).update(id, { active: false })
    //     } catch (error: any) {
    //         throw new Error(error)
    //     }
    // }

}