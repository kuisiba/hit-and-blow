import { Form } from "antd";
import { useState } from "react";
import { BLOW_COLOR, HIT_COLOR, MISS_COLOR } from "./color";
import { GuessesComponent } from "./components/GuessesComponent";
import { RuleComponent } from "./components/Rule";
import {
	Description,
	StyledButton,
	StyledCard,
	StyledFormItem,
	StyledInput,
} from "./components/Styled";
import { useAnswer } from "./hooks/useAnswer";
import type { Guesses } from "./types";

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

const App = () => {
	const [form] = Form.useForm();
	const [history, setHistory] = useState<Guesses[]>([]);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [answer, resetAnswer] = useAnswer();

	const onFinish = async (value: { inputNumber: string }) => {
		if (gameOver) {
			resetAnswer();
			setHistory([]);
			setGameOver(false);
			form.resetFields();
			return;
		}

		await form.validateFields();

		const guesses = Array.from(value.inputNumber).map((item, index) => {
			return {
				index,
				value: item,
				result: calcResult(answer, index, item),
			};
		});

		const newHistory = history.concat({ index: history.length, guesses });
		setHistory(newHistory);

		if (
			guesses.every((guess) => guess.result === "HIT") ||
			newHistory.length >= 5
		) {
			setGameOver(true);
		}
	};

	return (
		<>
			<StyledCard>
				<Form onFinish={onFinish} form={form}>
					{history.map((guesses) => (
						<GuessesComponent key={guesses.index} guesses={guesses.guesses} />
					))}
					<StyledFormItem
						name="inputNumber"
						rules={[
							{ required: true, message: "input: [0000-9999]" },
							{
								pattern: /^[0-9]{4}$/,
								message: "input: [0000-9999]",
							},
						]}
						validateTrigger="onSubmit"
					>
						<StyledInput placeholder="4桁の数字を入力" />
					</StyledFormItem>
					<StyledFormItem>
						<StyledButton htmlType="submit">
							{gameOver ? "もう一回" : "決定"}
						</StyledButton>
					</StyledFormItem>
				</Form>
				<Description color={HIT_COLOR}>位置と数字があっている</Description>
				<Description color={BLOW_COLOR}>位置が間違っている</Description>
				<Description color={MISS_COLOR}>位置と数字が間違っている</Description>
			</StyledCard>
			<RuleComponent />
		</>
	);
};

export default App;
