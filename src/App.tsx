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
import { generateGuess, isGameOver } from "./guess";
import { useAnswer } from "./hooks/useAnswer";
import type { GuessesInterface } from "./types";

const App = () => {
	const [form] = Form.useForm();
	const [history, setHistory] = useState<GuessesInterface[]>([]);
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

		const guesses = generateGuess(value.inputNumber, answer);
		const newHistory = history.concat({ index: history.length, guesses });
		setHistory(newHistory);

		if (isGameOver(guesses, newHistory)) {
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
							{
								validator: async (_, value) => {
									if (gameOver) return Promise.resolve();
									if (!value) {
										throw new Error("This field is required.");
									}
									if (!/^[0-9]{4}$/.test(value)) {
										throw new Error("input: [0000-9999]");
									}
									return Promise.resolve();
								},
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
