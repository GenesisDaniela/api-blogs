import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";
import { RoleEntity } from '../../role/entity/role.entity';
import { ArticleEntity } from "../../../article/entity/article.entity";

@Entity({ name: "person" })
export class PersonEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    email!: string

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        select:false
    })
    password!: string

    @Column({
        type: "varchar",
        length: 30,
        unique: false,
        nullable: false
    })
    names!: string

    @Column({
        type: "varchar",
        length: 30,
        unique: false,
        nullable: false
    })
    lastnames!: string

    @Column({
        type:"varchar",
        unique:true,
        nullable:false
    })
    num_document!:string

    @Column({
        type: "varchar",
        length: 255,
        unique: false,
        nullable: true
    })
    img!: string

    @Column({
        type: "boolean",
        default: true,
        nullable: false
    })
    active!: boolean

    @ManyToOne(() => RoleEntity, (role) => role.person)
    @JoinColumn({ name: "role_id" })
    role!: RoleEntity

    @OneToMany(()=> ArticleEntity, (article)=> article.person)
    person!:ArticleEntity[]
    
    @BeforeInsert()
    toLowerCase() {
        this.names = this.names.toLowerCase()
        this.lastnames = this.lastnames.toLowerCase()
    }
}