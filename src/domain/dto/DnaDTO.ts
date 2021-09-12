/**
 * Class with DnaDto
 *
 * @author jurbano
 * @since 2021-09-11
 */
export default class DnaDTO {
    dna: string [];
	isMutant: boolean;

    constructor(
        dna: string [],
		isMutant: boolean
    ) {
        this.dna = dna;
		this.isMutant = isMutant;
    }
}