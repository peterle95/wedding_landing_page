"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type Language = 'en' | 'it' | 'ru';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Translations = {
  // Navigation
  home: {
    en: 'Home',
    it: 'Home',
    ru: 'Главная',
  },
  gallery: {
    en: 'Gallery',
    it: 'Galleria',
    ru: 'Галерея',
  },
  location: {
    en: 'Location',
    it: 'Posizione',
    ru: 'Локация',
  },
  rsvp: {
    en: 'RSVP',
    it: 'Conferma',
    ru: 'Подтверждение',
  },
  
  // Home Page
  weddingTitle: {
    en: 'Liliia & Peter',
    it: 'Liliia & Peter',
    ru: 'Лилия и Пётр',
  },
  weddingSubtitle: {
    en: 'Are joyfully tying the knot and they can\'t wait to celebrate with you!',
    it: 'Si uniscono in matrimonio e non vedono l\'ora di festeggiare con voi!',
    ru: 'С радостью связывают свои судьбы и с нетерпением ждут возможности отпраздновать с вами!',
  },
  
  // Event Details
  eventDetails: {
    en: 'Event Details',
    it: 'Dettagli Evento',
    ru: 'Детали мероприятия',
  },
  dateTime: {
    en: 'Date & Time',
    it: 'Data e Ora',
    ru: 'Дата и время',
  },
  eventDate: {
    en: 'Saturday, June 27th, 2026',
    it: 'Sabato 27 Giugno 2026',
    ru: 'Суббота, 27 июня 2026',
  },
  ceremonyTime: {
    en: 'Ceremony at 4:00 PM',
    it: 'Cerimonia alle 16:00',
    ru: 'Церемония в 16:00',
  },
  locationTitle: {
    en: 'Location',
    it: 'Luogo',
    ru: 'Место проведения',
  },
  venueName: {
    en: 'Castello di Rocca Grimalda',
    it: 'Castello di Rocca Grimalda',
    ru: 'Замок Рокка-Гримальда',
  },
  Address: {
    en: 'Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia',
    it: 'Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia',
    ru: 'Пьяцца Сенаторе Боргатта, 2, 15078 Рокка-Гримальда AL, Италия',
  },
  seeYouThere: {
    en: 'See You There?',
    it: 'Ci Vediamo Lì?',
    ru: 'Увидимся там?',
  },
  dressCode: {
    en: 'Dress Code',
    it: 'Dress Code',
    ru: 'Код одежды',
  },
  dressCodeDescription: {
    en: 'Colorful, modern and elegant',
    it: 'Colori, moderno e elegante',
    ru: 'Красивый, современный и элегантный',
  },

  giftMessage: {
    en: 'Your presence would be the greatest gift, but if you wish to honor us with a gift, a contribution to our honeymoon fund would be warmly appreciated.',
    it: 'La tua presenza sarebbe il più grande regalo, ma se desideri onorarci con un regalo, una donazione al nostro fondo di nozze sarebbe apprezzata.',
    ru: 'Ваше присутствие будет для нас лучшим подарком, но если вы хотите почтить нас подарком, мы будем искренне благодарны за вклад в наш медовый месяц.',
  },

  rsvpByDate: {
    en: 'Kindly RSVP by February 1st, 2026.',
    it: 'Fateci sapere entro il 1° Febbraio 2026.',
    ru: 'Пожалуйста, подтвердите ваше присутствие до 1 февраля 2026 года.',
  },

  rsvpButton: {
    en: 'RSVP Now',
    it: 'Conferma Ora',
    ru: 'Подтвердить',
  },

  // Countdown 
  countdownTitle: {
    en: 'Countdown to the Big Day!',
    it: 'Conto alla rovescia per il grande giorno!',
    ru: 'Обратный отсчет до важного дня!',
  },
  days: {
    en: 'days',
    it: 'giorni',
    ru: 'дней',
  },
  hours: {
    en: 'hours',
    it: 'ore',
    ru: 'часов',
  },
  minutes: {
    en: 'minutes',
    it: 'minuti',
    ru: 'минут',
  },
  seconds: {
    en: 'seconds',
    it: 'secondi',
    ru: 'секунд',
  },
  loadingCountdown: {
    en: 'Loading countdown...',
    it: 'Caricamento conto alla rovescia...',
    ru: 'Загрузка обратного отсчета...',
  },
  
  // RSVP
  rsvpTitle: {
    en: 'RSVP',
    it: 'Conferma',
    ru: 'Подтверждение',
  },
  rsvpDescription: {
    en: 'Please let us know if you can attend our special day',
    it: 'Fateci sapere se potete partecipare al nostro giorno speciale',
    ru: 'Пожалуйста, сообщите нам, если вы сможете присутствовать на нашем особом дне',
  },
  rsvpPageTitle: {
    en: 'Will You Be There?',
    it: 'Ci Sarete?',
    ru: 'Вы будете там?',
  },
  rsvpPageSubtitle: {
    en: 'Please let us know if you can make it by May 1st, 2026.',
    it: 'Fateci sapere entro il 1° Maggio 2026.',
    ru: 'Пожалуйста, сообщите нам, если вы сможете присутствовать до 1 мая 2026 года.',
  },
  selectName: {
    en: 'Select Your Name',
    it: 'Seleziona il tuo nome',
    ru: 'Выберите ваше имя',
  },
  surname: {
    en: 'Surname',
    it: 'Cognome',
    ru: 'Фамилия',
  },
  chooseName: {
    en: 'Start typing and select your name',
    it: 'Inizia a digitare e seleziona il tuo nome',
    ru: 'Начните вводить и выберите ваше имя',
  },
  loading: {
    en: 'Loading...',
    it: 'Caricamento...',
    ru: 'Загрузка...',
  },
  confirmName: {
    en: 'Type Your Name To Confirm',
    it: 'Digita il tuo nome per confermare',
    ru: 'Введите ваше имя для подтверждения',
  },
  startTyping: {
    en: 'Type your name here that matches the name on your invitation',
    it: 'Scrivi il tuo nome qui che corrisponde al nome sulla tua invitazione',
    ru: 'Введите ваше имя здесь, которое соответствует имени на вашем приглашении',
  },
  accept: {
    en: 'Accept',
    it: 'Accetto',
    ru: 'Принять',
  },
  decline: {
    en: 'Decline',
    it: 'Declino',
    ru: 'Отказаться',
  },
  thankYou: {
    en: 'Thank You!',
    it: 'Grazie!',
    ru: 'Спасибо!',
  },
  rsvpReceived: {
    en: 'Your RSVP has been received!',
    it: 'La tua conferma è stata ricevuta!',
    ru: 'Ваше подтверждение получено!',
  },
  excitedToCelebrate: {
    en: 'We\'re so excited to celebrate with you.',
    it: 'Siamo entusiasti di festeggiare con voi.',
    ru: 'Мы так рады отпраздновать с вами.',
  },
  backToHome: {
    en: 'Back to Home',
    it: 'Torna alla Home',
    ru: 'Вернуться на главную',
  },
  errorLoadingGuests: {
    en: 'Failed to load guests',
    it: 'Impossibile caricare gli ospiti',
    ru: 'Не удалось загрузить гостей',
  },
  pickYourName: {
    en: 'Pick your name',
    it: 'Seleziona il tuo nome',
    ru: 'Выберите ваше имя',
  },
  pleaseSelectName: {
    en: 'Please enter your name and surname.',
    it: 'Per favore inserisci il tuo nome e cognome.',
    ru: 'Пожалуйста, введите ваше имя и фамилию.',
  },
  nameConfirmation: {
    en: 'Name confirmation',
    it: 'Conferma nome',
    ru: 'Подтверждение имени',
  },
  nameMustMatch: {
    en: 'Typed name must match the selected name.',
    it: 'Il nome digitato deve corrispondere a quello selezionato.',
    ru: 'Введенное имя должно совпадать с выбранным именем.',
  },
  submissionFailed: {
    en: 'Submission failed',
    it: 'Invio fallito',
    ru: 'Отправка не удалась',
  },
  rsvpSent: {
    en: 'RSVP sent!',
    it: 'Conferma inviata!',
    ru: 'Подтверждение отправлено!',
  },
  thankYouStatus: {
    en: 'Thank you. Status:',
    it: 'Grazie. Stato:',
    ru: 'Спасибо. Статус:',
  },

  // Food Preferences
  selectFoodPreference: {
    en: 'Select Food Preference',
    it: 'Seleziona preferenza culinaria',
    ru: 'Выберите предпочтение в еде',
  },
  chooseFoodPreference: {
    en: 'Choose your food preference',
    it: 'Scegli la tua preferenza culinaria',
    ru: 'Выберите ваше предпочтение в еде',
  },
  foodPreferenceRequired: {
    en: 'Food preference required',
    it: 'Preferenza culinaria richiesta',
    ru: 'Необходимо указать предпочтение в еде',
  },
  pleaseSelectFoodPreference: {
    en: 'Please select your food preference.',
    it: 'Seleziona la tua preferenza culinaria.',
    ru: 'Пожалуйста, выберите ваше предпочтение в еде.',
  },
  foodPreferenceError: {
    en: 'Failed to load food preferences',
    it: 'Impossibile caricare le preferenze culinarie',
    ru: 'Не удалось загрузить предпочтения в еде',
  },
  foodPreferenceLoading: {
    en: 'Loading food preferences...',
    it: 'Caricamento preferenze culinarie...',
    ru: 'Загрузка предпочтений в еде...',
  },

  // Gallery
  galleryTitle: {
    en: 'Our Moments',
    it: 'I Nostri Momenti',
    ru: 'Наши моменты',
  },
  galleryDescription: {
    en: 'A collection of memories leading up to our special day.',
    it: 'Una raccolta di ricordi che ci hanno portato al nostro giorno speciale.',
    ru: 'Коллекция воспоминаний, ведущих к нашему особому дню.',
  },

  // Location
  howToGetThere: {
    en: 'How To Get There',
    it: 'Come Arrivare',
    ru: 'Как добраться',
  },
  cantWaitToSeeYou: {
    en: 'We can\'t wait to see you in Rocca Grimalda.',
    it: 'Non vediamo l\'ora di vedervi a Rocca Grimalda.',
    ru: 'Мы не можем дождаться, когда увидим вас в Рокка-Гримальда.',
  },
  venueAddress: {
    en: 'Venue Address',
    it: 'Indirizzo',
    ru: 'Адрес места проведения',
  },
  openInGoogleMaps: {
    en: 'Open in Google Maps',
    it: 'Apri in Google Maps',
    ru: 'Открыть в Google Maps',
  },
  
  // Common
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Optional: Set language based on browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'it') {
        setLanguage('it');
      } else if (browserLang === 'ru') {
        setLanguage('ru');
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (language) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
