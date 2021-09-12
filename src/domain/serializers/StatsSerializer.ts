/**
 * Class with DnaMapper
 *
 * @author jurbano
 * @since 2021-09-11
 */
export default class DnaMapper {
    count_mutant_dna: number;
	count_human_dna: number;
	ratio: number;

    constructor(
		count_mutant_dna: number, count_human_dna: number, ratio: number
    ) {
        this.count_mutant_dna = count_mutant_dna;
		this.count_human_dna = count_human_dna;
		this.ratio = ratio;
    }
}