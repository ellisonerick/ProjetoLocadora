import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class FILME_PESSOA{
    @PrimaryColumn()
    ID: string;

    @Column()
    IDPESSOA:string;

    @Column()
    IDFILME:string;

    @Column()
    FUNCAO:string;

    @Column()
    FUNCAO:string;

    @ManyToOne(
        
    )
}