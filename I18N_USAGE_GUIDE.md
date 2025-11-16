# Type-Safe i18n Usage Guide

This guide explains how to use the type-safe internationalization (i18n) system in your application.

## Overview

The application now has a fully type-safe i18n setup using `react-i18next` with TypeScript. This means you get:
- ✅ **Autocomplete** for all translation keys
- ✅ **Type checking** to catch missing or incorrect keys at compile time
- ✅ **Nested structure** for better organization
- ✅ **6 languages** supported: English, Indonesian, German, French, Spanish, Italian

## Structure

```
src/lib/
├── i18n.ts              # Main i18n configuration
├── i18n.d.ts            # TypeScript declarations for type safety
└── locales/
    ├── en.ts            # English translations
    ├── id.ts            # Indonesian translations
    ├── de.ts            # German translations
    ├── fr.ts            # French translations
    ├── es.ts            # Spanish translations
    └── it.ts            # Italian translations
```

## How to Use in Components

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('nav.home')}</p>
    </div>
  );
}
```

### With TypeScript Autocomplete

When you type `t('`, you'll get autocomplete suggestions for all available translation keys! The type system will also catch errors if you use a non-existent key.

```tsx
// ✅ Correct - will autocomplete and work
t('nav.home')
t('socials.title')
t('common.welcome')

// ❌ Wrong - TypeScript will show an error
t('nav.notExist')  // Error: Property 'notExist' does not exist
```

## Adding New Translations

### Step 1: Add to English locale (this is your base/reference)

Edit [src/lib/locales/en.ts](src/lib/locales/en.ts):

```ts
const en = {
  nav: {
    home: 'Home',
    // Add your new key here
    about: 'About',
  },
  socials: {
    title: 'socials',
  },
  common: {
    welcome: 'Welcome',
    goodbye: 'Goodbye',
  },
  // You can add new sections
  footer: {
    copyright: 'Copyright 2024',
    privacy: 'Privacy Policy',
  },
} as const;
```

### Step 2: Add translations to other languages

Then update the same keys in:
- [src/lib/locales/id.ts](src/lib/locales/id.ts) (Indonesian)
- [src/lib/locales/de.ts](src/lib/locales/de.ts) (German)
- [src/lib/locales/fr.ts](src/lib/locales/fr.ts) (French)
- [src/lib/locales/es.ts](src/lib/locales/es.ts) (Spanish)
- [src/lib/locales/it.ts](src/lib/locales/it.ts) (Italian)

**Important:** Keep the structure identical across all language files. Only the values (translations) should differ.

### Step 3: Use in your components

```tsx
import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t } = useTranslation();

  return <h1>{t('nav.about')}</h1>;
}
```

TypeScript will immediately recognize your new keys and provide autocomplete!

## Language Switcher

A language switcher component has been created at [src/components/LanguageSwitcher.tsx](src/components/LanguageSwitcher.tsx) and is already integrated in the Header.

To use it elsewhere:

```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

function MyComponent() {
  return (
    <div>
      <LanguageSwitcher />
    </div>
  );
}
```

## Advanced Usage

### Access current language

```tsx
const { i18n } = useTranslation();

console.log(i18n.language); // 'en', 'id', 'de', etc.
```

### Change language programmatically

```tsx
const { i18n } = useTranslation();

i18n.changeLanguage('id'); // Switch to Indonesian
```

### Interpolation (dynamic values)

If you need to include dynamic values in translations:

1. Add to locale files:
```ts
const en = {
  greeting: {
    hello: 'Hello, {{name}}!',
  },
};
```

2. Use in component:
```tsx
t('greeting.hello', { name: 'John' }) // Output: "Hello, John!"
```

### Pluralization

For plural forms:

1. Add to locale files:
```ts
const en = {
  items: {
    count: 'You have {{count}} item',
    count_plural: 'You have {{count}} items',
  },
};
```

2. Use in component:
```tsx
t('items.count', { count: 1 })  // "You have 1 item"
t('items.count', { count: 5 })  // "You have 5 items"
```

## Best Practices

1. **Use nested structure** - Organize translations by feature/section:
   ```ts
   {
     nav: { ... },
     footer: { ... },
     profile: { ... },
   }
   ```

2. **Keep keys semantic** - Use descriptive names:
   ```ts
   // ✅ Good
   { button: { submit: 'Submit', cancel: 'Cancel' } }

   // ❌ Bad
   { btn1: 'Submit', btn2: 'Cancel' }
   ```

3. **Always update all language files** - When you add a key to `en.ts`, update all other language files to maintain consistency.

4. **Use `as const`** - Always keep `as const` at the end of locale objects for proper type inference.

## Examples from the Codebase

### Header Component
See [src/components/Header.tsx](src/components/Header.tsx:6) for a complete example.

### Socials Component
See [src/features/socials/socials.component.tsx](src/features/socials/socials.component.tsx:13) for another example.

## Troubleshooting

### TypeScript not showing autocomplete?

1. Make sure your editor's TypeScript server is running
2. Try restarting your TypeScript server (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
3. Ensure [src/lib/i18n.d.ts](src/lib/i18n.d.ts) exists

### Translation not updating?

1. Check that you've imported i18n in the root: [src/routes/__root.tsx](src/routes/__root.tsx:16)
2. Verify the translation key exists in all language files
3. Clear your build cache and restart the dev server

## Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
