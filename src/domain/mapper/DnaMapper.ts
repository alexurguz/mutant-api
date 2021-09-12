/**
 * Class with DnaMapper
 *
 * @author jurbano
 * @since 2021-09-11
 */
export default class DnaMapper {
    dna: string [];
	isMutant: boolean = false;

    constructor(
        dna: string [],
		isMutant: boolean
    ) {
        this.dna = dna;
		this.isMutant = isMutant;
    }
}