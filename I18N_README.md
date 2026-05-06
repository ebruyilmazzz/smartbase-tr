# SmartBase Multi-Language System

## Overview
This website now supports dynamic multi-language functionality for Turkish (tr) and English (en). The system automatically detects the user's browser language and switches accordingly, with Turkish as the default fallback.

## Features

### 1. Language Detection
- **Browser Language Detection**: Automatically detects user's browser language on first visit
- **LocalStorage Persistence**: Remembers user's language preference across sessions
- **Default Language**: Turkish (tr) as fallback when browser language is not supported

### 2. Language Switcher
- **Desktop**: Language switch button in the navigation bar (TR/EN)
- **Mobile**: Language switch button in the mobile menu
- **Instant Switch**: Language changes without page reload

### 3. SEO Optimization
- **Hreflang Tags**: Proper SEO tags for multilingual support
- **HTML Lang Attribute**: Dynamically updated based on selected language
- **URL Structure**: Ready for /tr and /en URL patterns (if needed in future)

### 4. Dynamic Content
- **All Static Text**: All user-facing text is translatable
- **Dynamic Hero Text**: Rotating service names (ERP, CRM, etc.) are translated
- **Form Messages**: Form submission messages are localized

## File Structure

```
smart_base/
├── index.html              # Main HTML with data-i18n attributes
├── translations.json       # Centralized translation file
├── i18n.js                 # i18n module for language management
└── I18N_README.md          # This documentation file
```

## How It Works

### 1. Translation File (`translations.json`)
Contains all translations organized by language and section:
```json
{
  "tr": {
    "nav": {
      "about": "Hakkımızda",
      "services": "Hizmetler"
    },
    "hero": {
      "subtitle": "..."
    }
  },
  "en": {
    "nav": {
      "about": "About Us",
      "services": "Services"
    },
    "hero": {
      "subtitle": "..."
    }
  }
}
```

### 2. HTML Attributes
Translatable elements use `data-i18n` attributes:
```html
<h2 data-i18n="nav.about">Hakkımızda</h2>
<p data-i18n="hero.subtitle">...</p>
```

### 3. JavaScript Module (`i18n.js`)
The i18n module provides:
- `switchLanguage(lang)`: Switch between languages
- `getTranslation(key, lang)`: Get translation by key
- `getCurrentLang()`: Get current language
- `getTranslations()`: Get all translations

## Usage

### Adding New Translations

1. **Add to translations.json**:
```json
{
  "tr": {
    "new_section": {
      "new_key": "Yeni metin"
    }
  },
  "en": {
    "new_section": {
      "new_key": "New text"
    }
  }
}
```

2. **Add to HTML**:
```html
<p data-i18n="new_section.new_key">Yeni metin</p>
```

### Using Translations in JavaScript

```javascript
// Get current language
const currentLang = window.i18n.getCurrentLang();

// Get translation
const text = window.i18n.getTranslation('nav.about');

// Get all translations
const allTranslations = window.i18n.getTranslations();

// Switch language programmatically
window.i18n.switchLanguage('en');
```

## Browser Language Detection

The system detects browser language in this order:
1. Check localStorage for saved preference
2. If no saved preference, check browser language
3. If browser language is English (en), use English
4. Otherwise, default to Turkish (tr)

## Future Enhancements

### Optional: i18next Integration
For larger projects, consider using [i18next](https://www.i18next.com/):
```bash
npm install i18next
```

Benefits:
- Pluralization support
- Interpolation
- Namespace support
- Loading translations from separate files
- Better caching and performance

### Optional: Backend CMS Integration
For future CMS integration, structure translations to match:
```json
{
  "tr": {
    "page": {
      "hero": {
        "title": "{{cms:hero_title}}"
      }
    }
  }
}
```

## Troubleshooting

### Translations Not Loading
- Check browser console for errors
- Ensure `translations.json` is in the correct location
- Verify the file path in `i18n.js` is correct

### Language Not Persisting
- Check that localStorage is enabled in browser
- Verify the key name: `smartbase_lang`

### Missing Translations
- The system falls back to Turkish if English translation is missing
- Check the translation key matches between languages
- Ensure JSON syntax is valid

## Performance Considerations

- Translations are loaded once on page load
- Language switching is instant (no reload)
- Minimal memory footprint
- No external dependencies required

## Support

For questions or issues with the i18n system, refer to:
- This documentation
- Code comments in `i18n.js`
- Translation file structure in `translations.json`
