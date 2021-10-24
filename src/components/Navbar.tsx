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

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <img src={logoImg} alt="img logo" /> <Logo>wit <LogoSecondaryText>Weather</LogoSecondaryText></Logo>
      </Ul>
    </Nav>
  )
}
export default Navbar