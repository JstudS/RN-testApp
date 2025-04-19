import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslation from './locales/en/translation.json'
import arTranslation from './locales/ar/translation.json'

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en: {
                translation: enTranslation
            },
            ar: {
                translation: arTranslation
            }
        },
        interpolation: {
            escapeValue: false,
          },

    })

export default i18n