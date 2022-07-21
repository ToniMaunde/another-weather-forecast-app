import { useEffect, useState } from "react";

type WeatherIconType = {
  url: Promise<string>;
  alt: string;
  className: string | undefined;
};

export default function WeatherIcon(props: WeatherIconType) {
  const { url, alt, className } = props;
  const [localURL, setLocalURL] = useState("");

  useEffect(() => {
    url.then(value => setLocalURL(value));
  },[])
  return (
    <img
      src={localURL}
      alt={alt}
      className={className}
    />
  )
}