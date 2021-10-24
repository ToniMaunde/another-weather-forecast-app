import styled from "styled-components"

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  background-color: var(--clr-primary);
  padding: 1.6rem;
  margin-top: auto;
  color: var(--clr-primary);
`

const Information = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  text-align: center;
`

const ExternalLink = styled.a`
  color: var(--clr-secondary);
`

const Footer = () => {
  return (
    <StyledFooter>
      <Information>
        <ExternalLink href="https://miltondavid.com" target="_blank" rel="noreferrer">miltondavid.com</ExternalLink>
      </Information>
    </StyledFooter>
  )
}
export default Footer