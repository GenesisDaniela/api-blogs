import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { PersonEntity } from "../../person/person/entity/person.entity";

@Entity({ name: "article" })
export class ArticleEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 150,
        unique: true,
        nullable: false
    })
    titulo!: string

    //* campo nuevo
    @Column({
        type: 'varchar',
        length: 500,
        nullable: false,
        select:true
    })
    contenido!: string

    @Column({
        type: "varchar",
        length: 250,
        unique: false,
        nullable: true
    })
    img!: string
    
    @ManyToOne(() => PersonEntity, (person) => person.person)
    @JoinColumn({ name: "person_id" })
    person!: PersonEntity

}