export default function Footer() {
  return (
    <footer className="px-7 mt-auto mb-8 flex flex-col text-secondary">
      <p className="font-semibold text-primary">Weather App</p>
      <a
        href="https://github.com/ToniMaunde/another-weather-forecast-app"
        target="_blank"
        rel="noreferrer"
      >
        github repository&#128279;
      </a>
      <p className="mt-4 font-semibold text-primary">Author</p>
      <a
        href="https://miltondavid.com/"
        target="_blank"
        rel="noreferrer"
      >
        personal website&#128279;
      </a>
      <a
        href="https://github.com/ToniMaunde"
        target="_blank"
        rel="noreferrer"
      >
        github profile&#128279;
      </a>
    </footer>
  )
}