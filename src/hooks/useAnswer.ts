import { useCallback, useEffect, useState } from "react";

export const generateAnswer = (): string[] => {
	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const answer = [];

	while (answer.length < 4) {
		const randomIndex = Math.floor(Math.random() * numbers.length);
		const randomNumber = numbers.splice(randomIndex, 1)[0];
		answer.push(randomNumber.toString());
	}

	return answer;
};

export const useAnswer = () => {
	const [answer, setAnswer] = useState<string[]>([]);

	const resetAnswer = useCallback(() => {
		setAnswer(generateAnswer());
	}, []);

	useEffect(() => {
		resetAnswer();
	}, [resetAnswer]);

	return [answer, resetAnswer] as const;
};
