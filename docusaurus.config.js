// @ts-check
// Аннотации JSDoc `@type` позволяют автоматически выполнять редактирование и проверку типов
// (в сочетании с `@ts-check`).
// Существуют различные эквивалентные способы объявления конфигурации вашего Docusaurus.
// Смотрите: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// Это выполняется в Node.js - Здесь не используется клиентский код (API браузера, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Phoenix Laboratory",
  tagline: "Место, для изучения чего-то нового!",
  //Иконка сайта
  favicon: "img/fawicon.ico",

  // Укажите рабочий URL вашего сайта здесь
  url: "https://nextgenos.tech",
  // Укажите /<baseUrl>/ путь, по которому будет доступен ваш сайт
  // Для развертывания страниц на GitHub часто используется "/<Имя проекта>/"
  baseUrl: "/",

  // Конфигурация развертывания страниц GitHub.
  // Если вы не используете страницы GitHub, они вам не нужны.
  organizationName: "RiPetitor", // Обычно это ваша организация на GitHub/имя пользователя.
  projectName: "phoenixlaboratory", // Обычно это имя вашего репозитория.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Даже если вы не используете интернационализацию, вы можете использовать это поле для задания
  // полезных метаданных, таких как язык html. Например, если ваш сайт на китайском, вы
  // можете захотеть заменить "en" на "zh-Hans".
  i18n: {
    defaultLocale: "ru",
    locales: ["ru"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Пожалуйста, измените это на свой репозиторий.
          // Удалите это, чтобы удалить ссылки "редактировать эту страницу".
          editUrl: "https://github.com/RiPetitor/phoenixlaboratory/edit/main",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Полезные опции для внедрения лучших практик ведения блога
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /**/ // @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Настройка стартовой темы
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: "img/phoenix.png",
      navbar: {
        title: "PhoenixLab",
        logo: {
          alt: "Мой сайт",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Документация",
          },
          {
            type: "docSidebar",
            sidebarId: "learnSidebar",
            position: "left",
            label: "Обучение",
          },
          { to: "/blog", label: "Блог", position: "left" }, // Блог
          // { type: "localeDropdown", position: "right" }, // Кнопка с языками (Убрано на не определенный срок, не удалять!)
          {
            href: "https://github.com/RiPetitor/phoenixlaboratory",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} PhoenixLab. Создано с ❤️ для изучения нового!`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
};

export default config;
