import styled, { css } from 'styled-components'

const Nav = styled.nav`
  display: flex;
  background-color: var(--clr-secondary);
`

const Ul = styled.ul`
  display: flex;
  width: 100%;
  padding: 1.6rem;
`

const Logo = styled.span`
  font-weight: 600;
  font-size: var(--fs-6);
  color: var(--clr-tertiary);
`

const LogoSecondaryText = styled.span`
  color: var(--clr-primary);
`

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <Logo>wit <LogoSecondaryText>Weather</LogoSecondaryText></Logo>
      </Ul>
    </Nav>
  )
}
export default Navbar