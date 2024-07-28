export interface GuessInterface {
	index: number;
	value: string;
	result: "HIT" | "BLOW" | "MISS";
}

export interface GuessesInterface {
	index: number;
	guesses: GuessInterface[];
}
