import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const CodeLink = ({ to, children }) => (
  <Link to={to}>
    <code>{children}</code>
  </Link>
);

const FeatureList = [
  {
    title: "Изучай!",
    Img: require("@site/static/img/book.png").default,
    description: (
      <>
        Данный сайт спроектирован для того, чтобы вы изучали его! Не стесняйтесь
        получать новые знания или повторять уже пройденное!
      </>
    ),
  },
  {
    title: "Сосредоточьтесь на том, что важно!",
    Img: require("@site/static/img/lampa.png").default,
    description: (
      <>
        Мы специально разделили{" "}
        <CodeLink to="/docs/doces/intro">Документацию</CodeLink>,{" "}
        <CodeLink to="/docs/learn/intro">Обучение</CodeLink> и{" "}
        <CodeLink to="/blog">Блог</CodeLink>, чтобы вы выбрали то, что истинно
        важно для вас на данный момент!
      </>
    ),
  },
  {
    title: "Мы работает для вас!",
    Img: require("@site/static/img/ruka.png").default,
    description: (
      <>
        Мы работаем для того, чтобы у вас под рукой всегда была актуальная
        информация по нашему продукту, а так же место для изучения материала,
        спасибо, что выбираете нас!
      </>
    ),
  },
];

function Feature({ Img, title, description }) {
  const isSpecialImage = title === "Изучай!" || Img.includes("book.png");

  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureCard}>
        <div className={styles.iconContainer}>
          <img
            src={Img}
            className={clsx(
              styles.featureIcon,
              isSpecialImage && styles.featureIconLarge,
            )}
            alt={title}
          />
        </div>
        <div className={styles.cardContent}>
          <Heading as="h3" className={styles.cardTitle}>
            {title}
          </Heading>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
