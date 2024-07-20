import styled from "styled-components";
import type { Guess } from "../types";

const StyledDiv = styled.div`
display: flex;
width: 100%;
`;

const StyledBox = styled.div`
color: #ffffff;
background-color: ${({ color }) => color};
border: 1px solid #ffffff;
margin: 4px;
text-align: center;
width: 25%;
`;

interface Props {
	guesses: Guess[];
}

export const GuessesComponent = ({ guesses }: Props) => {
	return (
		<StyledDiv>
			{guesses.map((guess) => (
				<StyledBox
					key={guess.index}
					color={
						guess.result === "HIT"
							? "#377e22"
							: guess.result === "BLOW"
								? "#958129"
								: "#5c0e09"
					}
				>
					{guess.value}
				</StyledBox>
			))}
		</StyledDiv>
	);
};
