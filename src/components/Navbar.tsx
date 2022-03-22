import logoImg from '../assets/logo.svg'
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