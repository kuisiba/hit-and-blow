import { Form } from "antd";
import {
	StyledButton,
	StyledCard,
	StyledDiv,
	StyledFormItem,
	StyledInput,
} from "./Styled";

const App = () => {
	return (
		<>
			<StyledCard>
				<Form>
					<StyledFormItem>
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
