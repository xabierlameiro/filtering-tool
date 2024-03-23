# Goal

![Landing page](landing_page.svg)

# Set up steps

- npx create-next-app@latest
- TypeScript - Yes
- ESLint - Yes
- Tailwind CSS - No
- src/ directory - No
- App Router - Yes
- import alias - No
- npm i -D @commitlint/config-conventional @commitlint/cli
  ### Types:
  - build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
  - docs: Documentation only changes
  - feat: A new feature
  - fix: A bug fix
  - perf: A code change that improves performance
  - refactor: A code change that neither fixes a bug nor adds a feature
  - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  - test: Adding missing tests or correcting existing tests
- npm i -D husky
- npm i -D lint-staged
- npm i -D standard-version

# Getting started

- npm run dev
- npm run release
- npm run pre-release

# Libs

- https://www.conventionalcommits.org/es/v1.0.0/
- https://keepachangelog.com/en/1.0.0/
- https://github.com/conventional-changelog/standard-version#readme
- https://shiki.style/guide/dual-themes#light-dark-dual-themes
- https://rehype-pretty-code.netlify.app/