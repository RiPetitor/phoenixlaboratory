import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={clsx("right", styles.hero__logo)}>
          <img src="img/phoenix.png" alt="Феникс" width={600} />
        </div>
        <Heading as="h1" className="hero__title white">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle white">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--golden button--lg"
            to="/docs/doces/intro"
          >
            Документация
          </Link>
          <Link
            className="button button--golden button--lg"
            to="/docs/learn/intro"
          >
            Обучение
          </Link>
          <Link className="button button--golden button--lg" to="/blog">
            Блог
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
