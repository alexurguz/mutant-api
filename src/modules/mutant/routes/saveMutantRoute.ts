import Server from '../../../Server';
import * as express from 'express';
import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema, createValidator } from 'express-joi-validation';
import IRoute from '../../../domain/IRoute';
import Database from '../../../datasource/database';
import GetDnaIfExistsRepository from '../repository/GetDnaIfExistsRepository';
import GetDnaIfExistsUseCase from '../use-case/GetDnaIfExistsUseCase';
import SaveMutantRepository from '../repository/SaveMutantRepository';
import SaveMutantUseCase from '../use-case/SaveMutantUseCase';
import ApiError from '../../../domain/errors/ApiError';
import Dna from "../../../domain/models/Dna";
import DnaDTO from "../../../domain/dto/DnaDTO";
import Constants from "../../../helpers/Constants";

interface DnaValidatorRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        dna: string []
    }
}

export default class SaveMutantRoute implements IRoute {
    async register(server: Server, database: Database<any>): Promise<any> {

        const getDnaIfExistsRepository = new GetDnaIfExistsRepository(database);
        const getDnaIfExistsUseCase = new GetDnaIfExistsUseCase(getDnaIfExistsRepository);
        const saveMutantRepository = new SaveMutantRepository(database);
        const saveMutantUseCase = new SaveMutantUseCase(saveMutantRepository, getDnaIfExistsUseCase);
        const validator = createValidator();

        const querySchema = Joi.object({
            dna: Joi.array().required().length(Constants.ADN_LENGHT)
				.custom(this.validateLengthStringDna, "custom validation")
				.custom(this.validateAllowStringsDna, "custom validation")
        });

        server.getApp()?.post('/mutant', validator.body(querySchema),
            async (req: ValidatedRequest<DnaValidatorRequestSchema>, res: express.Response) => {
            try {
                const dnaDTO: DnaDTO = req.body as DnaDTO; 

                const dna: Dna = new Dna(dnaDTO.dna, dnaDTO.isMutant);
                const result = await saveMutantUseCase.exec(dna);

                return res.status(200).json(result);
            } catch (error) {
                console.error('saveMutantRoute', error);
                if (error instanceof ApiError) {
                    return res.status(error.code).json({ message: error.message });
                }
                return res.status(200).json({ message: error.message });
            }
        });
    }

	validateLengthStringDna = (value: any, helper: any) => {
		let isInvalid: boolean = false;
		value.forEach((dnaString: string ) => {
			if( dnaString.length != Constants.ADN_LENGHT ){
				isInvalid = true;
			}
		});

		if( isInvalid )
			return helper.message(`Invalid length of any string in dna array`);

		return value;
	};

	validateAllowStringsDna = (value: any, helper: any) => {
		let isInvalid: boolean = false;
		const expreg = new RegExp("^([A]|[T]|[G]|[C]|){6}$");
		value.forEach((dnaString: string ) => {
			if( !expreg.test(dnaString) ){
				isInvalid = true;
			}
		});

		if( isInvalid )
			return helper.message(`Invalid string only can contains (A,T,C,G)`);

		return value;
	};

}
