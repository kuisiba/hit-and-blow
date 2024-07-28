import type { GuessInterface, GuessesInterface } from "./types";

const calcResult = (
	answer: string[],
	idx: number,
	value: string,
): "HIT" | "BLOW" | "MISS" => {
	if (answer[idx] === value) {
		return "HIT";
	}
	if (answer.includes(value)) {
		return "BLOW";
	}
	return "MISS";
};

export const generateGuess = (
	inputNumber: string,
	answer: string[],
): GuessInterface[] => {
	return Array.from(inputNumber).map((item, index) => {
		return {
			index,
			value: item,
			result: calcResult(answer, index, item),
		};
	});
};

export const isGameOver = (
	guesses: GuessInterface[],
	history: GuessesInterface[],
) => guesses.every((guess) => guess.result === "HIT") || history.length >= 5;
