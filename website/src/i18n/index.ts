export const locales = ['en', 'ru', 'minecraft', 'sims', 'gotic'] as const
export type Locale = (typeof locales)[number]

export const localeLabel: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  minecraft: 'Blocky language',
  sims: 'The Sims',
  gotic: 'Gothic Language'
}

type BaseDict = Record<string, string>

const en = {
  'meta.title': 'VPS Studio — control your servers',
  'meta.description':
    'Desktop app to manage VPS backends, automate setup via SSH, and keep everything observable.',

  'nav.features': 'Features',
  'nav.pricing': 'Pricing',
  'nav.pricing.note': '(free forever)',
  'nav.how': 'How it works',
  'nav.stack': 'Stack',
  'nav.buyDomain': 'Buy Domain',
  'nav.sponsor': 'Buy Hosting',
  'nav.download': 'Download',
  'nav.mobile.menu': 'Menu',
  'nav.github': 'GitHub',
  'nav.github.hint': 'Star and watch',

  'hero.badge': 'COMMUNITY EDITION',
  'hero.badge.accent': '(FREE FOREVER)',
  'hero.badge.noAi': 'NO AI',
  'hero.title': 'VPS Studio',
  'hero.subtitle':
    'Manage dev containers and environments in a couple of clicks. Run development apps locally or on a remote server—with minimal manual console work. A Docker Desktop alternative for development with fast project bootstrapping (in the spirit of dev.new).',
  'hero.tagline':
    'Like Portainer meets local dev.new — manage containers with a GUI and bootstrap projects in seconds.',
  'hero.cta.primary': 'Get the app',
  'hero.cta.secondary': 'How it works',

  'dl.button': 'Download installer',
  'dl.more': 'More download options',
  'dl.menu': 'Download options',
  'dl.copied': 'Copied',
  'dl.option.macos': 'macOS (DMG)',
  'dl.option.ios': 'iOS (PWA)',
  'dl.option.android': 'Android (PWA)',
  'dl.option.windows': 'Windows (EXE)',
  'dl.option.linuxAppImage': 'Linux (AppImage)',
  'dl.option.linuxDeb': 'Linux (DEB)',
  'dl.option.linuxRpm': 'Linux (RPM)',
  'dl.option.npx': 'Install via npx',
  'dl.option.source': 'Install from source',

  'pricing.title': 'Pricing',
  'pricing.subtitle': 'Simple: Community Edition is free forever. No paywalls.',
  'pricing.card.title': 'Community Edition',
  'pricing.card.price': 'Free forever',
  'pricing.card.body':
    'The landing content is for demonstration. The product is under active development.',

  'noPro.title': 'Upgrade to Pro',
  'noPro.badge': 'NO PRO EDITION',
  'noPro.liveseySays': 'Doctor Livesey:',
  'noPro.laugh': 'AHAHAHAHAHAHA',
  'noPro.body1': 'There was never a Pro. There will never be a Pro.',
  'noPro.body2': 'You’ll have to use it for free. Forever.',
  'noPro.cta': 'Fine, I’ll use it for free. DIDN’T WANT PRO ANYWAY.',

  'feature.localhost.title': 'Localhost backend',
  'feature.localhost.body': 'Run an embedded backend on your machine and experiment fast.',
  'feature.remote.title': 'Remote backends by URL',
  'feature.remote.body': 'Point the app to an http/https endpoint and start interacting.',
  'feature.ssh.title': 'SSH setup automation (Ubuntu 24.04)',
  'feature.ssh.body':
    'Connect via SSH, detect OS, install Docker + Node 22, clone the agent, and run it with pm2.',
  'feature.typed.title': 'Typed interface (Zod)',
  'feature.typed.body': 'Schemas define API payloads and setup events end-to-end.',
  'feature.observable.title': 'Observable UI',
  'feature.observable.body':
    'Legend State-driven UI: status badges, progress logs, and fast iteration.',
  'feature.localapi.title': 'Local API (Hono)',
  'feature.localapi.body': 'Simple local backend with CORS enabled for the renderer.',

  'how.title': 'How it works',
  'how.subtitle':
    'VPS Studio can talk to a local backend, a remote backend by URL, or bootstrap a server over SSH.',

  'how.step1.title': 'Pick a backend',
  'how.step1.body': 'Localhost by default, or connect to a remote server by URL.',
  'how.step2.title': 'See nodes in a grid',
  'how.step2.body': 'The backend returns “items” with launch commands and installed software.',
  'how.step3.title': 'Take server under control',
  'how.step3.body': 'If needed, run the setup wizard and install the agent via SSH.',

  'pipeline.title': 'SSH setup pipeline (Ubuntu 24)',
  'pipeline.subtitle':
    'These are the actual setup steps from `interface/server-setup.ts` and the Ubuntu 24 strategy.',

  'pipe.connect': 'Connect over SSH',
  'pipe.detect_os': 'Detect OS',
  'pipe.select_strategy': 'Select strategy',
  'pipe.apt_deps': 'Install system dependencies (apt)',
  'pipe.docker': 'Install Docker',
  'pipe.nvm': 'Install nvm',
  'pipe.node': 'Install Node.js 22',
  'pipe.git': 'Install git',
  'pipe.clone': 'Clone agent repo',
  'pipe.npm_install': 'Install npm dependencies',
  'pipe.pm2': 'Install pm2',
  'pipe.start': 'Start service with pm2',

  'stack.title': 'Stack',
  'stack.subtitle': 'What the current repository uses today.',
  'stack.electron': 'Electron + Vite + React',
  'stack.hono': 'Hono (local backend)',
  'stack.ssh2': 'ssh2 (SSH transport)',
  'stack.zod': 'Zod (schemas)',
  'stack.legend': 'Legend State (state management)',
  'stack.tailwind': 'Tailwind (renderer UI)',

  'download.title': 'Download / run',
  'download.subtitle':
    'Binaries are not wired here yet; for now this section points to the repo workflow.',
  'download.quickStart': 'QUICK START',
  'download.cmd1': 'npm install',
  'download.cmd2': 'npm run dev',
  'download.note':
    'The Electron app starts the renderer (Vite) and a local backend (Hono). Remote connections and SSH setup are available from the UI.',

  'motivation.title': 'Motivation',
  'motivation.intro': 'I was tired of manually setting up infrastructure, databases, Kubernetes, and containers for the backend every time I started a project.',
  'motivation.goal': 'The goal:',
  'motivation.goal.item1': 'Download the app, connect it to local Docker or a remote server',
  'motivation.goal.item2': 'Click through everything you need with your mouse',
  'motivation.goal.item3': 'Write code in lambda functions, add sockets, quickly create a landing page',
  'motivation.goal.item4': 'Test it on a test VPS and download it as a project',
  'motivation.goal.item5': 'Export everything as code for Kubernetes, docker-compose, or package into a single VM',
  'motivation.wizard': 'Through the wizard, you can:',
  'motivation.wizard.item1': 'Click through what you need, write code, and launch it',
  'motivation.wizard.item2': 'Open lambdas, change their code right there, add secrets',
  'motivation.wizard.item3': 'Write test lambdas right there, click on them to execute',
  'motivation.wizard.item4': 'Get one-commit feature branch deployment like in Vercel',
  'motivation.bonus': 'You can even buy hosting in this app and configure it with your mouse, then save that template as code.',
  'screenshots.title': 'Screenshots',
  'screenshots.body': 'Select a server to connect to, then you can install databases, deploy your applications and images from the marketplace, and deploy serverless functions (SOON!).',
  'features.title': 'Features',
  'features.subtitle': 'Build and manage your infrastructure with a few clicks—no manual setup required.',
  'feature.gui.title': 'Visual Infrastructure Management',
  'feature.gui.body': 'Create and manage your entire infrastructure through a GUI. No need to manually configure Kubernetes, Docker Compose, or VMs every time you start a project.',
  'feature.lambda.title': 'Serverless Functions',
  'feature.lambda.body': 'Create lambda functions with a click, write code directly in the app, add secrets, and test them right away. One-commit feature branch deployment like Vercel.',
  'feature.database.title': 'Database Management',
  'feature.database.body': 'Install databases with a few clicks. Manage and configure them through the intuitive interface.',
  'feature.containers.title': 'Application Containers',
  'feature.containers.body': 'Add application containers, deploy images from the marketplace, and manage them all in one place.',
  'feature.code.title': 'Built-in Code Editor',
  'feature.code.body': 'Write and edit code for lambda functions directly in the app. No need to switch between tools.',
  'feature.deploy.title': 'Deploy & Test',
  'feature.deploy.body': 'Deploy your entire stack to a test VPS, test everything, and make changes on the fly.',
  'feature.export.title': 'Export to Code',
  'feature.export.body': 'Export your entire infrastructure as code: Kubernetes manifests, docker-compose files, or package it into a single VM.',
  'feature.connections.title': 'Multiple Connection Types',
  'feature.connections.body': 'Connect to local Docker or remote servers. Switch between environments seamlessly.',
  'feature.wizard.title': 'Project Wizard',
  'feature.wizard.body': 'Use the wizard to set up your entire project: infrastructure, databases, containers, sockets, and landing pages—all with a few clicks.',
  'feature.hosting.title': 'Integrated Hosting',
  'feature.hosting.body': 'Purchase hosting directly in the app, configure it with the GUI, and save the template as code for reuse.',
  'domain.title': 'Buy Domain',
  'domain.body': 'Need a domain name? Get a domain at REG.RU.',
  'domain.cta': 'Open REG.RU',
  'sponsor.title': 'Buy Hosting',
  'sponsor.body': 'Need a VPS fast? Order hosting at REG.CLOUD.',
  'sponsor.cta': 'Open REG.CLOUD',

  'lang.title': 'Language',
  'footer.rights': '© {year} VPS Studio. Built with Astro.',
  'footer.license': 'License (MIT)',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Use',
  'footer.github': 'github.com/nulnow/vps-studio',

  'legal.privacy.title': 'Privacy Policy',
  'legal.terms.title': 'Terms of Use',
  'legal.updated': 'Last updated: {date}',
  'legal.preamble':
    'This site and its content are provided for demonstration purposes. The product is under active development.',
  'legal.disclaimer.title': 'Disclaimer',
  'legal.disclaimer.p1':
    'I assume no responsibility or liability for any problems, losses, or damages that may arise from using this software or information.',
  'legal.disclaimer.p2':
    'Do not use this software for safety-critical or mission-critical projects. Use at your own risk.',
  'legal.repo': 'Repository: github.com/nulnow/vps-studio'
  ,
  'dev.banner': 'Site in development. For demonstration purposes only. The product is in pre-alpha testing',
  'dev.banner.feedback': 'Issues and suggestions: write here ->',
  'dev.banner.issues': 'https://github.com/nulnow/vps-studio/issues'
} satisfies BaseDict

export type MessageKey = keyof typeof en
export type Dict = Record<MessageKey, string>

const ru: Dict = {
  'meta.title': 'VPS Studio — управление серверами',
  'meta.description':
    'Десктоп-приложение для управления VPS: выбор backend, автоматизация установки по SSH и наблюдаемость.',

  'nav.features': 'Возможности',
  'nav.pricing': 'Pricing',
  'nav.pricing.note': '(free forever)',
  'nav.how': 'Как работает',
  'nav.stack': 'Стек',
  'nav.buyDomain': 'Купить домен',
  'nav.sponsor': 'Buy Hosting',
  'nav.download': 'Скачать',
  'nav.mobile.menu': 'Меню',
  'nav.github': 'GitHub',
  'nav.github.hint': 'Star & watch',

  'hero.badge': 'COMMUNITY EDITION',
  'hero.badge.accent': '(FREE FOREVER)',
  'hero.badge.noAi': 'НЕТ ИИ',
  'hero.title': 'VPS Studio',
  'hero.subtitle':
    'Управление dev-контейнерами и окружениями в пару кликов. Запускай приложения для разработки локально или на удалённом сервере — с минимумом ручной работы в консоли. Альтернатива Docker Desktop для девелопмента с быстрым стартом проектов (в духе dev.new).',
  'hero.tagline':
    'Как микс Portainer и локального dev.new — управляй контейнерами через GUI и запускай проекты за секунды.',
  'hero.cta.primary': 'Установить',
  'hero.cta.secondary': 'Как работает',

  'dl.button': 'Скачать установщик',
  'dl.more': 'Другие варианты установки',
  'dl.menu': 'Варианты установки',
  'dl.copied': 'Скопировано',
  'dl.option.macos': 'macOS (DMG)',
  'dl.option.ios': 'iOS (PWA)',
  'dl.option.android': 'Android (PWA)',
  'dl.option.windows': 'Windows (EXE)',
  'dl.option.linuxAppImage': 'Linux (AppImage)',
  'dl.option.linuxDeb': 'Linux (DEB)',
  'dl.option.linuxRpm': 'Linux (RPM)',
  'dl.option.npx': 'Установка через npx',
  'dl.option.source': 'Установка из исходников',

  'pricing.title': 'Pricing',
  'pricing.subtitle': 'Просто: Community Edition — бесплатно навсегда. Без paywall.',
  'pricing.card.title': 'Community Edition',
  'pricing.card.price': 'Бесплатно навсегда',
  'pricing.card.body': 'Контент на лендинге — для демонстрации. Продукт в разработке.',

  'noPro.title': 'Upgrade to Pro',
  'noPro.badge': 'ПРО НЕ БУДЕТ',
  'noPro.liveseySays': 'Доктор Ливси:',
  'noPro.laugh': 'АХАХАХАХАХАХА',
  'noPro.body1': 'У нас никогда не было Pro — и никогда не будет.',
  'noPro.body2': 'Придётся пользоваться бесплатно. Навсегда.',
  'noPro.cta': 'Ладно, попользуюсь уже бесплатно, НЕ ОЧЕНЬ ТО И ХОТЕЛОСЬ',

  'feature.localhost.title': 'Backend на localhost',
  'feature.localhost.body': 'Запускай встроенный backend на своей машине и быстро экспериментируй.',
  'feature.remote.title': 'Удалённые backends по URL',
  'feature.remote.body': 'Укажи http/https endpoint и начинай работать.',
  'feature.ssh.title': 'Автоустановка по SSH (Ubuntu 24.04)',
  'feature.ssh.body':
    'Подключение по SSH, определение ОС, установка Docker + Node 22, клонирование агента и запуск через pm2.',
  'feature.typed.title': 'Типизированный интерфейс (Zod)',
  'feature.typed.body': 'Схемы описывают API payload и события установки сквозным образом.',
  'feature.observable.title': 'Наблюдаемый UI',
  'feature.observable.body': 'UI на Legend State: статус, логи прогресса и быстрые итерации.',
  'feature.localapi.title': 'Локальный API (Hono)',
  'feature.localapi.body': 'Простой локальный backend с CORS для renderer.',

  'how.title': 'Как работает',
  'how.subtitle':
    'VPS Studio умеет говорить с локальным backend, подключаться к удалённому по URL или “поднять” сервер через SSH.',

  'how.step1.title': 'Выбери backend',
  'how.step1.body': 'По умолчанию — localhost, либо подключение к удалённому серверу по URL.',
  'how.step2.title': 'Смотри ноды в сетке',
  'how.step2.body': 'Backend отдаёт “items” с командами запуска и списком установленного ПО.',
  'how.step3.title': 'Возьми сервер под контроль',
  'how.step3.body': 'Если нужно — запусти установщик и поставь агент по SSH.',

  'pipeline.title': 'SSH-пайплайн установки (Ubuntu 24)',
  'pipeline.subtitle':
    'Это реальные шаги установки из `interface/server-setup.ts` и стратегии Ubuntu 24.',

  'pipe.connect': 'Подключение по SSH',
  'pipe.detect_os': 'Определение ОС',
  'pipe.select_strategy': 'Выбор стратегии',
  'pipe.apt_deps': 'Системные зависимости (apt)',
  'pipe.docker': 'Установка Docker',
  'pipe.nvm': 'Установка nvm',
  'pipe.node': 'Установка Node.js 22',
  'pipe.git': 'Установка git',
  'pipe.clone': 'Клонирование репозитория агента',
  'pipe.npm_install': 'Установка npm зависимостей',
  'pipe.pm2': 'Установка pm2',
  'pipe.start': 'Запуск сервиса через pm2',

  'stack.title': 'Стек',
  'stack.subtitle': 'То, что реально используется в репозитории сейчас.',
  'stack.electron': 'Electron + Vite + React',
  'stack.hono': 'Hono (локальный backend)',
  'stack.ssh2': 'ssh2 (SSH транспорт)',
  'stack.zod': 'Zod (схемы)',
  'stack.legend': 'Legend State (состояние)',
  'stack.tailwind': 'Tailwind (UI renderer)',

  'download.title': 'Скачать / запустить',
  'download.subtitle':
    'Бинарники пока не подключены; сейчас тут базовый workflow репозитория.',
  'download.quickStart': 'БЫСТРЫЙ СТАРТ',
  'download.cmd1': 'npm install',
  'download.cmd2': 'npm run dev',
  'download.note':
    'Electron запускает renderer (Vite) и локальный backend (Hono). Подключения по URL и SSH-установка доступны из UI.',

  'motivation.title': 'Мотивация',
  'motivation.intro': 'Мне надоело каждый раз при старте проекта поднимать инфраструктуру, базу, Kubernetes, создавать контейнеры для бэкенда.',
  'motivation.goal': 'Цель этого проекта:',
  'motivation.goal.item1': 'Скачать программу, подключить её либо к локальному Docker, либо к удалённому серверу',
  'motivation.goal.item2': 'Накликать мышкой КЛИК КЛИК всё, что нужно',
  'motivation.goal.item3': 'Написать код в лямбда-функциях, добавить сокеты, лендинг тоже накликать быстро',
  'motivation.goal.item4': 'Сразу протестировать на тестовом VPS и скачать как проект',
  'motivation.goal.item5': 'Выгрузить всё в код для развертывания под Kubernetes, docker-compose или просто упаковать в одну VM',
  'motivation.wizard': 'Через мастер можно:',
  'motivation.wizard.item1': 'Накликать мышкой всё, что нужно, написать код, запустить',
  'motivation.wizard.item2': 'Открывать лямбды, прямо тут же менять их код, добавлять секреты',
  'motivation.wizard.item3': 'Прямо там же написать лямбды для теста, нажимать на них и чтобы они выполнялись',
  'motivation.wizard.item4': 'Получить one-commit feature branch deployment как в Vercel',
  'motivation.bonus': 'В этой программе можно даже купить хостинг и сразу же в ней его настроить мышкой и сохранить этот шаблон в код.',
  'screenshots.title': 'Скриншоты',
  'screenshots.body': 'Выбери сервер для подключения, затем на нём можно устанавливать базы данных, разворачивать свои приложения и образы из маркетплейса, а также деплоить serverless функции (СКОРО!).',
  'features.title': 'Возможности',
  'features.subtitle': 'Создавай и управляй инфраструктурой в пару кликов—без ручной настройки.',
  'feature.gui.title': 'Визуальное управление инфраструктурой',
  'feature.gui.body': 'Создавай и управляй всей инфраструктурой через графический интерфейс. Не нужно каждый раз вручную настраивать Kubernetes, Docker Compose или VM при старте проекта.',
  'feature.lambda.title': 'Serverless функции',
  'feature.lambda.body': 'Создавай лямбда-функции одним кликом, пиши код прямо в программе, добавляй секреты и тестируй сразу. One-commit feature branch deployment как в Vercel.',
  'feature.database.title': 'Управление базами данных',
  'feature.database.body': 'Устанавливай базы данных в пару кликов. Управляй и настраивай их через интуитивный интерфейс.',
  'feature.containers.title': 'Контейнеры приложений',
  'feature.containers.body': 'Добавляй контейнеры приложений, разворачивай образы из маркетплейса и управляй всем в одном месте.',
  'feature.code.title': 'Встроенный редактор кода',
  'feature.code.body': 'Пиши и редактируй код для лямбда-функций прямо в программе. Не нужно переключаться между инструментами.',
  'feature.deploy.title': 'Развертывание и тестирование',
  'feature.deploy.body': 'Разворачивай весь стек на тестовом VPS, тестируй всё и вноси изменения на лету.',
  'feature.export.title': 'Экспорт в код',
  'feature.export.body': 'Экспортируй всю инфраструктуру как код: манифесты Kubernetes, docker-compose файлы или упакуй в одну VM.',
  'feature.connections.title': 'Разные типы подключений',
  'feature.connections.body': 'Подключайся к локальному Docker или удалённым серверам. Переключайся между окружениями без проблем.',
  'feature.wizard.title': 'Мастер проектов',
  'feature.wizard.body': 'Используй мастер для настройки всего проекта: инфраструктура, базы данных, контейнеры, сокеты и лендинги—всё в пару кликов.',
  'feature.hosting.title': 'Интегрированный хостинг',
  'feature.hosting.body': 'Покупай хостинг прямо в программе, настраивай его через GUI и сохраняй шаблон в код для повторного использования.',
  'domain.title': 'Купить домен',
  'domain.body': 'Нужен домен? Закажи домен в REG.RU.',
  'domain.cta': 'Открыть REG.RU',
  'sponsor.title': 'Buy Hosting',
  'sponsor.body': 'Нужен VPS быстро? Закажи хостинг в REG.CLOUD.',
  'sponsor.cta': 'Открыть REG.CLOUD',

  'lang.title': 'Язык',
  'footer.rights': '© {year} VPS Studio. Сделано на Astro. (милитарум? 🧐)',
  'footer.license': 'Лицензия (MIT)',
  'footer.privacy': 'Политика конфиденциальности',
  'footer.terms': 'Условия использования',
  'footer.github': 'github.com/nulnow/vps-studio',

  'legal.privacy.title': 'Политика конфиденциальности',
  'legal.terms.title': 'Условия использования',
  'legal.updated': 'Обновлено: {date}',
  'legal.preamble':
    'Этот сайт и его контент предназначены для демонстрации. Продукт находится в активной разработке.',
  'legal.disclaimer.title': 'Отказ от ответственности',
  'legal.disclaimer.p1':
    'Я не несу никакой ответственности за возможные проблемы, потери или ущерб, которые могут возникнуть при использовании программы или информации.',
  'legal.disclaimer.p2':
    'Не используйте программу для критически важных проектов. Используете на свой риск.',
  'legal.repo': 'Репозиторий: github.com/nulnow/vps-studio'
  ,
  'dev.banner': 'Сайт в разработке, контент для демонстрации, продукт в РАЗРАБОТКЕ',
  'dev.banner.feedback': 'По поводу проблем и предложений писать сюда ->',
  'dev.banner.issues': 'https://github.com/nulnow/vps-studio/issues'
}

const minecraft: Dict = {
  ...en,
  'meta.title': 'VPS Studio — Blocky Edition',
  'meta.description':
    'Desktop app to build your server world: choose environments, view nodes in grid, and automate setup via SSH.',

  'hero.badge': 'CREATIVE MODE',
  'hero.badge.accent': '(NO PAYWALL GEMS)',
  'hero.title': 'VPS Studio',
  'hero.subtitle':
    'Manage dev containers and environments in a couple of clicks. Run dev apps locally or on a remote server—with minimal manual console grinding. A Docker Desktop alternative for development with fast project bootstrapping (in the spirit of dev.new).',
  'hero.cta.primary': 'Build the App',
  'hero.cta.secondary': 'Check Blueprint',

  'features.title': 'Blocks, Circuits & Backends',
  'features.subtitle':
    'Everything in this world is built from current repo: Electron UI, embedded base, circuit connections, and strategy for Ubuntu 24.',

  'noPro.title': 'Get Pro Edition',
  'noPro.badge': 'PRO? NOT IN THIS VERSION',
  'noPro.liveseySays': 'Builder Livesey: Hmm!',
  'noPro.laugh': 'AHAHAHAHAHAHA',
  'noPro.body1': 'Pro Edition was never planned. Won\'t be in release.',
  'noPro.body2': 'You get the free edition. Forever. Like infinite blocks.',
  'noPro.cta': 'Fine. I\'ll use free. Didn\'t want gem Pro anyway.',

  'feature.localhost.title': 'Local Base',
  'feature.localhost.body': 'Build an embedded base on your machine and work fast.',
  'feature.remote.title': 'Remote Environments by Portal',
  'feature.remote.body': 'Enter connection coordinates and start exploring.',
  'feature.ssh.title': 'Circuit Automation (Ubuntu 24.04)',
  'feature.ssh.body':
    'Connect via SSH, detect environment, build Docker + Node 22, clone builder, run with pm2.',
  'feature.typed.title': 'Blueprint Schematics (Zod)',
  'feature.typed.body': 'Schematics define block data and circuit events end-to-end.',
  'feature.observable.title': 'Observable Blocks',
  'feature.observable.body':
    'Circuit-driven UI: status lights, building logs, and fast block updates.',
  'feature.localapi.title': 'Local Village (Hono)',
  'feature.localapi.body': 'Simple village API with circuit repeaters for renderer.',

  'how.title': 'How It Builds',
  'how.subtitle':
    'VPS Studio can trade with local village, connect to remote environments via portal, or generate new world via SSH.',

  'how.step1.title': 'Select Environment',
  'how.step1.body': 'Local village by default, or connect to remote environments by portal.',
  'how.step2.title': 'View Blocks in Grid',
  'how.step2.body': 'The base returns "items" with spawn commands and enchanted tools.',
  'how.step3.title': 'Claim Area',
  'how.step3.body': 'If needed, run the builder wizard and trade for agent via SSH.',

  'pipeline.title': 'Circuit Automation Pipeline (Ubuntu 24)',
  'pipeline.subtitle':
    'These are the actual building steps from `interface/server-setup.ts`.',

  'pipe.connect': 'Connect via SSH',
  'pipe.detect_os': 'Detect Environment',
  'pipe.select_strategy': 'Select Circuit Design',
  'pipe.apt_deps': 'Build System Components (Apt)',
  'pipe.docker': 'Build Docker',
  'pipe.nvm': 'Build nvm',
  'pipe.node': 'Build Node.js 22',
  'pipe.git': 'Build git',
  'pipe.clone': 'Clone Builder',
  'pipe.npm_install': 'Build npm Components',
  'pipe.pm2': 'Build pm2',
  'pipe.start': 'Activate Circuit',

  'stack.title': 'Building Table',
  'stack.subtitle': 'Blocks used in current version.',
  'stack.electron': 'Electron + Vite + React (Building Table)',
  'stack.hono': 'Hono (Village Center)',
  'stack.ssh2': 'ssh2 (Transport)',
  'stack.zod': 'Zod (Blueprint Plans)',
  'stack.legend': 'Legend State (Circuit Logic)',
  'stack.tailwind': 'Tailwind (Block Renderer)',

  'download.title': 'Download / Build',
  'download.subtitle':
    'Binaries not yet ready; currently points to world generation.',
  'download.cmd1': 'npm install',
  'download.cmd2': 'npm run build-world',
  'download.note':
    'The building table loads the block renderer (Vite) and village center (Hono). Portal connections and trading available.',

  'nav.features': 'Blocks',
  'nav.pricing': 'Trading',
  'nav.pricing.note': '(free gems)',
  'nav.buyDomain': 'Buy Domain',
  'nav.how': 'Circuit Guide',
  'nav.stack': 'Building Grid',
  'nav.sponsor': 'Buy hosting',
  'nav.download': 'Download World',
  'nav.mobile.menu': 'Building Menu',

  'pricing.title': 'Builder Trading',
  'pricing.subtitle': 'Simple: Community Edition trades for free forever. No gem paywalls.',
  'pricing.card.title': 'Community Edition (Creative)',
  'pricing.card.price': 'Free Forever',
  'pricing.card.body':
    'This world is for demonstration. The village is under active expansion.',

  'dl.button': 'Download World',
  'dl.more': 'More Building Options',
  'dl.menu': 'Building Options',
  'dl.copied': 'Blueprint Copied',
  'dl.option.macos': 'macOS (DMG)',
  'dl.option.ios': 'iOS (PWA)',
  'dl.option.android': 'Android (PWA)',
  'dl.option.windows': 'Windows (EXE)',
  'dl.option.linuxAppImage': 'Linux (AppImage)',
  'dl.option.linuxDeb': 'Linux (DEB)',
  'dl.option.linuxRpm': 'Linux (RPM)',
  'dl.option.npx': 'Build via npx',
  'dl.option.source': 'Build from Source',

  'sponsor.title': 'bue hosting',
  'sponsor.body': 'Need server blocks? Get hosting at BLOCK HOSTING.',
  'sponsor.cta': 'Open Hosting',

  'lang.title': 'Builder Language',
  'footer.rights': '© {year} VPS Studio. Built with Astro.',
  'footer.privacy': 'Block Policy',
  'footer.terms': 'Builder Terms',
  'footer.github': 'github.com/nulnow/vps-studio',

  'legal.privacy.title': 'Block Privacy Policy',
  'legal.terms.title': 'Builder Trading Terms',
  'legal.updated': 'Last updated: {date}',
  'legal.preamble':
    'This world and its blocks are for demonstration. The project expands under active development.',
  'legal.disclaimer.title': 'Disclaimer',
  'legal.disclaimer.p1':
    'I\'m not responsible for any issues arising from using this software.',
  'legal.disclaimer.p2':
    'Don\'t use for important projects. Use at your own risk.',
  'legal.repo': 'Repository: github.com/nulnow/vps-studio',

  'dev.banner': 'WORLD BUILDING... DEMONSTRATION BLOCKS LOADING... BUILDERS NOT YET ACTIVE.'
}

const sims: Dict = {
  ...en,
  'meta.title': 'VPS Studio — The Sims Edition',
  'hero.badge': 'NEEDS: GREEN (FREE FOREVER)',
  'hero.badge.accent': '',
  'hero.cta.primary': 'Install now',
  'hero.cta.secondary': 'View features',
  'features.title': 'Make your VPS happy',
  'how.title': 'How it works (life simulation)',
  'pipeline.title': 'Setup pipeline (chores)',
  'download.title': 'Download / run (create a project)',
  'noPro.title': 'Upgrade to Pro',
  'noPro.badge': 'NO EXPANSION PACK',
  'noPro.liveseySays': 'Doctor Livesey:',
  'noPro.laugh': 'AHAHAHAHAHAHA',
  'noPro.body1': 'There was never a Pro. There will never be a Pro.',
  'noPro.body2': 'This content is included in the base game. Free.',
  'noPro.cta': 'Fine, I’ll play for free. Didn’t even want Pro anyway.',
  'footer.rights': '© {year} VPS Studio. Built with Astro. (Sul sul.)'
}

const gotic: Dict = {
  ...en,
  'meta.title': 'VPS Studio — Dark Sci-Fi Edition',
  'meta.description':
    'Desktop app to manage your battle servers, automate deployment via ancient protocols, and maintain holy observability.',

  'hero.badge': 'FOR THE EMPEROR',
  'hero.badge.accent': '(NO ARTIFICIAL INTELLIGENCE)',
  'hero.title': 'VPS Studio',
  'hero.subtitle':
    'Manage dev containers and environments in a few clicks. Launch development apps locally or on a remote server—with minimal manual console rites. A Docker Desktop alternative for development with rapid project bootstrapping (in the spirit of dev.new).',
  'hero.cta.primary': 'DEPLOY CAMPAIGN',
  'hero.cta.secondary': 'Review Tactics',

  'features.title': 'Armaments for the Great Campaign',
  'features.subtitle':
    'Everything in this archive is sanctified: Machine UI, embedded forge, blessed connections, and protocols for Ubuntu 24.',

  'noPro.title': 'REQUEST PRO PURGING',
  'noPro.badge': 'TECH-HERESY DETECTED',
  'noPro.liveseySays': 'Inquisitor Livesey:',
  'noPro.laugh': 'BLOOD FOR THE BLOOD CODE! (but no Pro)',
  'noPro.body1': 'The Pro Edition is tech-heresy. It shall be purged.',
  'noPro.body2':
    'The Emperor decrees: Use the free edition for eternity. The Omnissiah provides.',
  'noPro.cta':
    'SO BE IT. I SHALL USE THE FREE EDITION. I HAVE NO DESIRE FOR HERETICAL PRO.',

  'feature.localhost.title': 'Holy Forge',
  'feature.localhost.body': 'Activate an embedded machine spirit on your computer for sanctioned experiments.',
  'feature.remote.title': 'Remote Forge Worlds via Network',
  'feature.remote.body': 'Direct the interface to an Imperial communication endpoint.',
  'feature.ssh.title': 'Sanctified Deployment (Ubuntu 24.04)',
  'feature.ssh.body':
    'Establish blessed connection, detect the operating system, install Docker + Node 22, retrieve the sacred agent, and activate via holy pm2.',
  'feature.typed.title': 'Sanctified Protocols (Zod)',
  'feature.typed.body': 'Sacred schemas define Imperial transmission payloads end-to-end.',
  'feature.observable.title': 'Holy Observability',
  'feature.observable.body':
    'Machine-driven interface: status seals, campaign logs, and rapid execution cycles.',
  'feature.localapi.title': 'Sanctum Interface (Hono)',
  'feature.localapi.body': 'Consecrated local forge with CORS blessings for the renderer.',

  'how.title': 'The Great Campaign Protocol',
  'how.subtitle':
    'VPS Studio may commune with a local forge, remote forge worlds via network, or initiate deployment via blessed SSH.',

  'how.step1.title': 'Select Forge World',
  'how.step1.body': 'Local forge by decree, or establish contact with remote forge worlds.',
  'how.step2.title': 'View Servitor Grid',
  'how.step2.body':
    'The forge returns sanctified "servitors" with activation rites and blessed software.',
  'how.step3.title': 'Establish Control',
  'how.step3.body': 'If needed, enact protocol and install the sacred agent via blessed SSH.',

  'pipeline.title': 'Deployment Protocol (Ubuntu 24)',
  'pipeline.subtitle':
    'These are the sacred rites from `interface/server-setup.ts` and the strategy for Ubuntu 24.',

  'pipe.connect': 'Establish SSH Connection',
  'pipe.detect_os': 'Detect Operating System',
  'pipe.select_strategy': 'Select Campaign Tactics',
  'pipe.apt_deps': 'Install System Dependencies (Apt)',
  'pipe.docker': 'Install Blessed Docker',
  'pipe.nvm': 'Install Holy nvm',
  'pipe.node': 'Install Node.js 22 (Machine Spirit)',
  'pipe.git': 'Install Sacred git',
  'pipe.clone': 'Retrieve Agent',
  'pipe.npm_install': 'Install npm Dependencies',
  'pipe.pm2': 'Install Holy pm2',
  'pipe.start': 'Activate Service via pm2',

  'stack.title': 'Sanctified Tools',
  'stack.subtitle': 'The tools currently deployed in the repository.',
  'stack.electron': 'Electron + Vite + React (Machine Interface)',
  'stack.hono': 'Hono (Sanctum Forge)',
  'stack.ssh2': 'ssh2 (Blessed Transport)',
  'stack.zod': 'Zod (Sacred Schemas)',
  'stack.legend': 'Legend State (State Management)',
  'stack.tailwind': 'Tailwind (Sanctified Renderer)',

  'download.title': 'Deploy / Mobilize',
  'download.subtitle':
    'Binaries are not yet ready; currently points to repository campaign.',
  'download.quickStart': 'QUICUS STARTUS',
  'download.cmd1': 'npm install',
  'download.cmd2': 'npm run campaign',
  'download.note':
    'The interface activates the renderer (Vite) and local forge (Hono). Remote campaigns and SSH deployment available.',

  'nav.features': 'Armaments',
  'nav.pricing': 'Tithe',
  'nav.pricing.note': '(Emperor Protects)',
  'nav.buyDomain': 'Acquire Domain',
  'nav.how': 'Campaign Protocol',
  'nav.stack': 'Holy Tools',
  'nav.sponsor': 'Imperial Hosting',
  'nav.download': 'Deploy',
  'nav.mobile.menu': 'Tactics',

  'pricing.title': 'Imperial Tithe',
  'pricing.subtitle': 'By decree: Community Edition is free forever. No heretical paywalls.',
  'pricing.card.title': 'Community Edition (Sanctioned)',
  'pricing.card.price': 'Free for Eternity',
  'pricing.card.body':
    'This archive is for demonstration. The campaign continues to expand.',

  'dl.button': 'Download Installer',
  'dl.more': 'Additional Deployment Options',
  'dl.menu': 'Deployment Tactics',
  'dl.copied': 'Rite Complete',
  'dl.option.macos': 'MacOS (DMG)',
  'dl.option.ios': 'iOS (PWA)',
  'dl.option.android': 'Android (PWA)',
  'dl.option.windows': 'Windows (EXE)',
  'dl.option.linuxAppImage': 'Linux (AppImage)',
  'dl.option.linuxDeb': 'Linux (DEB)',
  'dl.option.linuxRpm': 'Linux (RPM)',
  'dl.option.npx': 'Deploy via npx',
  'dl.option.source': 'Deploy from Source',

  'sponsor.title': 'Imperial Hosting',
  'sponsor.body': 'Require a VPS for the campaign? Acquire hosting at TERRA HOSTING.',
  'sponsor.cta': 'Open Hosting',

  'lang.title': 'Gothic Language',
  'footer.rights': '© {year} VPS Studio. Built with Astro.',
  'footer.privacy': 'Imperial Decree',
  'footer.terms': 'Codex',
  'footer.github': 'github.com/nulnow/vps-studio',

  'legal.privacy.title': 'Imperial Decree',
  'legal.terms.title': 'Codex',
  'legal.updated': 'Last updated: {date}',
  'legal.preamble':
    'This site and its contents are for demonstration. The project is under active development.',
  'legal.disclaimer.title': 'Disclaimer',
  'legal.disclaimer.p1':
    'We assume no responsibility for any issues arising from use of this software.',
  'legal.disclaimer.p2':
    'Do not use for critical projects. Use at your own risk.',
  'legal.repo': 'Repository: github.com/nulnow/vps-studio',

  'dev.banner': 'SITE UNDER CONSTRUCTION. FOR DEMONSTRATION. DEPLOYMENT PENDING.'
}

export function t(locale: Locale, key: MessageKey, vars?: Record<string, string | number>) {
  const dict: Dict =
    locale === 'ru'
      ? ru
      : locale === 'minecraft'
        ? minecraft
        : locale === 'sims'
          ? sims
          : locale === 'gotic'
            ? gotic
            : en
  let s = dict[key] ?? en[key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, String(v))
    }
  }
  return s
}

export function hrefFor(locale: Locale, path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') return normalized
  return `/${locale}${normalized === '/' ? '/' : normalized}`
}


