import styled from 'styled-components'
import logoImg from '../assets/logo.svg'

const Nav = styled.nav`
  display: flex;
  background-color: var(--clr-primary);
`

const Ul = styled.ul`
  display: flex;
  width: 100%;
  padding: 1.6rem;

  @media(min-width: 768px) {
    padding: 2rem 4.6rem 1rem 4.6rem;
  }

  @media(min-width: 1024px) {
    padding: 4rem 8rem 1rem 8rem;
  }

  @media(min-width: 1440px) {
    padding: 4rem 18rem 1rem 18rem;
  }
`

const Logo = styled.span`
  font-size: var(--fs-6);
  color: #FFFFFF;
  margin-left: 12px;
`

const LogoSecondaryText = styled.span`
  font-weight: 600;
  color: var(--clr-secondary);
`
const LogoImage = styled.img`
  width: fit-content;
`

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <LogoImage src={logoImg} alt="img logo" /> <Logo>wit <LogoSecondaryText>Weather</LogoSecondaryText></Logo>
      </Ul>
    </Nav>
  )
}
export default Navbar