import { useTranslation } from "react-i18next";

interface LogoProps {
  size: number;
}

export function Logo({ size = 32 }: LogoProps) {
  const { t } = useTranslation();

  return (
    <svg
      aria-label={t("aria.logo")}
      height={size}
      role="img"
      viewBox="0 0 200 200"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle className="fill-foreground" cx="100" cy="100" r="100" />
        <path
          d="M160 96.985c-10.425 0-20.85-2.529-20-9.985-18.3 12.838-41.7 12.838-60 0-9.15 6.456-19.575 9.985-20 9.985H25V112h15c10.275 0 20.55-2.628 30-7.508 18.75 9.76 41.25 9.76 60 0 9.45 4.88 19.65 7.508 30 7.508h15V96.985"
          fillRule="nonzero"
          className="fill-background"
        />
      </g>
    </svg>
  );
}
