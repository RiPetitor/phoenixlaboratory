import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Изучай!',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Данный сайт спроектирован для того, чтобы вы изучали его!
        Не стесняйтесь получать новые знания или повторять уже пройденное!
      </>
    ),
  },
  {
    title: 'Сосредоточьтесь на том, что важно!',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Мы специально разделили <code>Документацию</code>, <code>Учебник</code> и <code>Блог</code>, 
        чтобы вы выбрали то, что истинно важно для вас на данный момент! 
      </>
    ),
  },
  {
    title: 'Мы работает для вас!',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Мы работаем для того, чтобы у вас под рукой всегда была актуальная информация по нашему продукту,
        а так же место для изучения материала, спасибо, что выбираете нас!
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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
