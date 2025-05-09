import { DataSource } from "typeorm";
import { FILME_PESSOA } from "./filme_pessoa.entity";
import { Inject } from "@nestjs/common";

export const filme_pessoaProviders = [{
    provide: 'FILME_PESSOA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FILME_PESSOA),
    inject: ['DATA_SOURCE'],
    },
];