import styled from "styled-components"

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  background-color: var(--clr-secondary);
  padding: 1.6rem;
  margin-top: auto;
`

const Information = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  text-align: center;
`

const Year = styled.p`
  margin-bottom: 0;
`

const Footer = () => {
  return (
    <StyledFooter>
      <Information>
        <a href="https://miltondavid.com" target="_blank" rel="noreferrer">miltondavid.com</a>
        <Year>{new Date().getFullYear()}</Year>
      </Information>
    </StyledFooter>
  )
}
export default Footer