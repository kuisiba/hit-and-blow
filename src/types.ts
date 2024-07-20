export interface Guess {
	index: number;
	value: string;
	result: "HIT" | "BLOW" | "MISS";
}

export interface Guesses {
	index: number;
	guesses: Guess[];
}
