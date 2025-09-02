import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function Card({ title, description, to }) {
  return (
    <Link
      to={to}
      className={clsx(styles.card)}
      aria-label={`Перейти: ${title}`}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
