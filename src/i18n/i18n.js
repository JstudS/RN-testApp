import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enWelcome from './locales/en/welcome.json'
import enSignIn from './locales/en/signIn.json'

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en: {
                welcome: enWelcome,
                signIn: enSignIn
            }
        },
        ns: ['welcome', 'signIn'],
        interpolation: {
            escapeValue: false,
          },

    })

export default i18n