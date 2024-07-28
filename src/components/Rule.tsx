import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0;
  }
`;

export const RuleComponent = () => {
	return (
		<StyledDiv>
			<h1>ルール</h1>
			<p>4桁の数値を当てるゲームです。</p>
			<p>答えは 0123 のように 0 から始まる場合もあります。</p>
			<p>
				ある桁で使われた数字は他の桁では使われません。(1123のような答えは出てきません)
			</p>
			<p>5回以内に当てられない場合はゲームオーバーです。</p>
		</StyledDiv>
	);
};
