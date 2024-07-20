import { Form } from "antd";
import {
	StyledButton,
	StyledCard,
	StyledDiv,
	StyledFormItem,
	StyledInput,
} from "./Styled";
import { generateAnswer } from "./generateAnswer";
import { useEffect, useState } from "react";
import type { Guesses } from "./types";
import { GuessesComponent } from "./GuessesComponent";

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

	useEffect(() => {
		setAnswer(generateAnswer());
	}, []);

	const onFinish = async (value: { inputNumber: string }) => {
		await form.validateFields();

		const guesses = Array.from(value.inputNumber).map((item, index) => {
			return {
				index,
				value: item,
				result: calcResult(answer, index, item),
			};
		});
		setHistory([...history, { index: history.length, guesses }]);
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
						<StyledButton type="primary" htmlType="submit">
							決定
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
