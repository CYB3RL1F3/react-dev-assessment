import styled from "styled-components";
const { default: bg } = require("./background.jpeg");

const colors = {
  green: "rgba(22, 128, 22, 0.6)",
  red: "rgba(128, 22, 22, 0.6)",
  lightGrey: "rgba(222, 222, 222, 0.2)",
  darkGrey: "rgba(222, 222, 222, 0.5)",
  black: "rgba(12, 12, 12, 0.6)"
};

const maxWidth = 720;

export const Header = styled.header`
  display: flex;
  margin: 0;
  flex-direction: column;
  font-family: "Lato";
`;

export const Handler = styled.article`
  display: flex;
  width: 60vw;
  margin: auto;
  background: ${colors.black};
  padding: 5rem;
  justify-content: space-between;
  position: relative;
  @media(max-width: ${maxWidth}px) {
    flex-direction: column-reverse;
  }
`;

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-image: url(${bg});
  background-repeat: no-repeat;
  min-width: 100vw;
  background-size: 100vw;
  min-height: 100vh;
  @media(max-width: ${maxWidth}px) {
    background-size: cover;
  }
`;

export const Title = styled.h3`
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
  font-family: "Lato";
  color: white;
  margin: 2rem auto;
`;

export const Infos = styled.p`
  font-size: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 15rem;
  height: 15rem;
  margin: 0;
  border-radius: 50%;
  @media(max-width: ${maxWidth}px) {
    width: 10rem;
    height: 10rem;
    margin: auto;
    margin-bottom: 4rem;
  }
`;

export const ErrorHandler = styled.p`
  color: white;
  width: 100%;
  background: ${colors.red};
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  font-family: Arial, Helvetica, sans-serif;
  animation: show 0.2s;
  @keyframes show{
    0% {
    transform: translateY(-3rem);
    }
    100% {
        transform: translateY(0px);
    }
  }
`

export const SuccessHandler = styled.p`
  color: white;
  width: 100%;
  background: ${colors.green};
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  font-family: Arial, Helvetica, sans-serif;
  animation: show 0.2s;
  @keyframes show{
    0% {
    transform: translateY(-3rem);
    }
    100% {
        transform: translateY(0px);
    }
  }
`;

export const Input = styled.input.attrs({
  type: "email",
  placeholder: "type email here...",
  autocomplete: "off"
})`
  width: 16rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 14px;
  border: none;
  border-radius: 3px;
  padding: 1px 10px;
  font-family: sans-serif;
  color: #cccccc;
  outline: none;
  margin: 1rem 0;
  background: ${colors.lightGrey};
  @media(max-width: ${maxWidth}px) {
    width: 14rem;
  }
`;

export const Submit = styled.input.attrs({
    type: "submit"
  })`
    width: 17.3rem;
    height: 2rem;
    line-height: 1.9rem;
    font-size: 14px;
    border: none;
    border-radius: 3px;
    padding: 1px 10px;
    font-family: sans-serif;
    color: #cccccc;
    outline: none;
    background: ${colors.lightGrey};
    &:disabled {
      color: ${colors.darkGrey};
      cursor: not-allowed;
    }
    @media(max-width: ${maxWidth}px) {
      width: 15.3rem;
    }
  `;