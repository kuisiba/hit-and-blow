import { Form } from "antd";
import { useEffect, useState } from "react";
import { GuessesComponent } from "./GuessesComponent";
import {
	StyledButton,
	StyledCard,
	StyledDiv,
	StyledFormItem,
	StyledInput,
} from "./Styled";
import { generateAnswer } from "./generateAnswer";
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
	const [answer, setAnswer] = useState<string[]>([]);
	const [history, setHistory] = useState<Guesses[]>([]);
	const [finish, setFinish] = useState<boolean>(false);

	useEffect(() => {
		setAnswer(generateAnswer());
	}, []);

	const onFinish = async (value: { inputNumber: string }) => {
		await form.validateFields();

		if (finish) {
			setAnswer(generateAnswer());
			setHistory([]);
			setFinish(false);
			form.resetFields();
			return;
		}

		const guesses = Array.from(value.inputNumber).map((item, index) => {
			return {
				index,
				value: item,
				result: calcResult(answer, index, item),
			};
		});
		const newHistory = history.concat({ index: history.length, guesses });
		setHistory(newHistory);

		// クリア
		if (guesses.every((guess) => guess.result === "HIT")) {
			setFinish(true);
		}

		// ゲームオーバー
		if (newHistory.length >= 5) {
			setFinish(true);
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
							{finish ? "もう一回" : "決定"}
						</StyledButton>
					</StyledFormItem>
				</Form>
				<StyledDiv color="#377e22">位置と数字があっている</StyledDiv>
				<StyledDiv color="#958129">位置が間違っている</StyledDiv>
				<StyledDiv color="#5c0e09">位置と数字が間違っている</StyledDiv>
			</StyledCard>
		</>
	);
};

export default App;
