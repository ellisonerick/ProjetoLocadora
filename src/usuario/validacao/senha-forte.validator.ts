import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions, registerDecorator } from 'class-validator';
import * as zxcvbn from 'zxcvbn';

@Injectable()
@ValidatorConstraint({async:true})
export class strongPassValidator implements ValidatorConstraintInterface{

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        var validaSenha = false;
        if (value){
            const result = zxcvbn(value);
            var validaSenha = (result.score <=2 );
        }
        return !validaSenha;
    }
}

export const SenhaForte = (opcaoValidacao: ValidationOptions)=>{
    return (objeto: Object, propriedade: string)=>{
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator:strongPassValidator,
        })
    }
}