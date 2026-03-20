# LiteCart — E2E на Playwright

Стенд: [litecart.stqa.ru](https://litecart.stqa.ru). Запуск: `npm install`, `npx playwright install`, потом `npm test`.

## Скрипты

```bash
npm test
npm run test:ui
npm run test:headed
npm run test:debug
npm run test:report
```

Allure (нужен отдельно установленный `allure` в PATH):

```bash
npm run test:allure
npm run allure:report
```

## Структура

`pages/` — POM, `tests/` — сценарии, `data/testData.ts` — урлы и креды, `helpers/` — очистка корзины и т.п., `fixtures/` — подключение страниц в тесты.

В конфиге `workers: 1` и без параллели — на этом стенде так меньше сюрпризов с корзиной.

## Сценарии

1. Логин, 3× green duck, заказ.
2. Логин, 2× yellow duck (со скидкой, размер если вылезет).
3. Без логина: два товара, проверка суммы, пустой email, recently viewed на главной.
4. Кривой пароль — ошибка, URL остаётся на логине.

Тестовый логин: `test@test.com` / `1234567890`
