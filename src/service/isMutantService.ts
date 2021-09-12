
interface Array<T> {
	shape(): number [];
	rowAt(idx : number): string [];
	colAt(idx : number): string [];
	diagonals(bottomToTop : boolean): string [][];
}

function searchDNASeqByChar(dnaSeqArray : string [], q: string, seqSize: number) {
	if(dnaSeqArray.length < seqSize)
		return 0
	let c = 0;
	let num_occurrences = 0;
	while (dnaSeqArray.length > 0) {
		let currDnaChar = dnaSeqArray.pop()
		if (currDnaChar !== q) {
			c = 0;
			num_occurrences += searchDNASeqByChar(dnaSeqArray, q, seqSize);
			continue;
		}
		c += 1;
		if (c >= seqSize) {
			c = 0;
			num_occurrences += 1;
		}
	}
	return num_occurrences;
}

Array.prototype.shape = function (){
	return [this.length, this[0].length];
}

Array.prototype.rowAt = function(index){
	return  [...this[index]];
}

Array.prototype.colAt = function(index : number){
	return  this.map((rowValues)=> rowValues[index]);
}

Array.prototype.diagonals = function(bottomToTop=false){
	const shape = this.shape();
	const numRows = shape[0];
	const numCols = shape[1];
	const maxLength = Math.max(numCols, numRows);
	let temp;
	let returnArray = [];
	for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
		temp = [];
		for (let y = numRows - 1; y >= 0; --y) {
			let x = k - (bottomToTop ? numRows - y - 1 : y);
			if (x >= 0 && x < numCols) {
				temp.push(this[y][x]);
			}
		}
		if(temp.length > 0) {
			returnArray.push(temp);
		}
	}
	return returnArray
}

function convertInMatrix(value: string []): string [][] {
	let dnaMatrix : string [][] = [];
	value.forEach((element, index) => {
		dnaMatrix.push(element.split(''));
	});
	return dnaMatrix;
}

/**
 * Verify is a dna string is mutant or not
 * @author johnurbaguz
 * @date 2021-09-12
 * @param {object} dnaData - A object of dna to register.
 * @param {object} dnaData - A object of dna to register.
 * @param {object} dnaData - A object of dna to register.
 * @param {object} dnaData - A object of dna to register.
 * @returns {Promise<any>}
 * @memberof SaveMutantUseCase
 */
const isMutant = (dnaString : string [], nitrogenousBaseLetters : string [], seqSize : number, maxNumSeq  : number) => {
	console.log('starting function isMutant:::');
	let dna: string [][] = convertInMatrix(dnaString);
	console.log('dna:::', dna);
	console.log('nitrogenousBaseLetters:::', nitrogenousBaseLetters);
	console.log('seqSize:::', seqSize);
	console.log('maxNumSeq:::', maxNumSeq);
	let occurrences = 0;
	const shape = dna.shape();
	const numRows = shape[0];
	const numCols = shape[1];
	for (const dnaSeqQueryChar of nitrogenousBaseLetters) {
		for (let i = 0; i < numRows; i++) {
			occurrences += searchDNASeqByChar(dna.rowAt(i), dnaSeqQueryChar, seqSize);
		}
		for (let i = 0; i < numCols; i++) {
			occurrences += searchDNASeqByChar(dna.colAt(i),dnaSeqQueryChar, seqSize);
		}
		// diagonals true start to iterate the array in diagonal way starting from the position array[5][0]->([5][1],[4][0])->([5][2],[4][1],[3][0])
		let diagonals = dna.diagonals(true)
		for(let i = 0; i < diagonals.length; i++){
			occurrences += searchDNASeqByChar(diagonals[i],dnaSeqQueryChar, seqSize);
		}
		// diagonals true start to iterate the array in diagonal way starting from the position array[0][0]->([1][0],[0][1])->([2][0],[1][1],[0][2])
		diagonals = dna.diagonals(false)
		for(let i = 0; i < diagonals.length; i++){
			occurrences += searchDNASeqByChar(diagonals[i],dnaSeqQueryChar, seqSize);
		}
		console.log('ocurrences::',occurrences);
		if(occurrences > maxNumSeq){
			return true;
		}
	}
	return false;
}

module.exports = {
	isMutant
}