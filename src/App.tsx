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

const App = () => {
	const [form] = Form.useForm();
	const [answer, setAnswer] = useState<string[]>([]);

	useEffect(() => {
		setAnswer(generateAnswer());
	}, []);

		await form.validateFields();
		console.log("onFinish");
	};

	return (
		<>
			<StyledCard>
				<Form onFinish={onFinish}>
					<StyledFormItem
						name="4digit number"
						rules={[
							{ required: true, message: "input: [0000-9999]" },
							{
								pattern: /^[0-9]{4}$/,
								message: "input: [0000-9999]",
							},
						]}
						validateTrigger="submit"
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
