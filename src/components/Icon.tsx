import type { MouseEventHandler } from "react";

export type TIcon = {
  viewBox: string;
  paths: Array<{
    d: string;
    fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
    clipRule?: string | number | undefined;
    strokeLineCap?: "butt" | "round" | "square";
    stroke?: string;
    id?: string;
  }>;
  title: string;
  customClasses?: string;
  id?: string;
  onClick?: MouseEventHandler<SVGElement> | undefined;
  "data-icon"?: string | undefined;
}

export function Icon(props: TIcon) {
  const {
    viewBox,
    paths,
    customClasses,
    title,
    id,
    onClick,
  } = props;

  return (
    <svg
      viewBox={viewBox}
      id={id}
      className={`icon cursor-pointer ${customClasses || ""}`}
      onClick={onClick}
      data-icon={props["data-icon"]}
    >
      <title id="title" lang="en">
        {title}
      </title>
      {paths.map((path, index) => (
        <path
          key={index}
          id={path.id}
          d={path.d}
          fillRule={path.fillRule}
          clipRule={path.clipRule}
          stroke={path.stroke}
          strokeLinecap={path.strokeLineCap}
        />
      ))}
    </svg>
  )
}