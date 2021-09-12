/**
 * Class with Dna model
 *
 * @author jurbano
 * @since 2021-09-11
 */
export default class Dna {
    dna: string [];
	isMutant: boolean;
    constructor(
        dna: string [], isMutant: boolean
    ) {
        this.dna = dna;
		this.isMutant = isMutant;
    }
}
