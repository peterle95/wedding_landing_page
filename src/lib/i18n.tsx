"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type Language = 'en' | 'it' | 'ru' | 'de';

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
    de: 'Home',
  },
  gallery: {
    en: 'Gallery',
    it: 'Galleria',
    ru: 'Галерея',
    de: 'Galerie',
  },
  location: {
    en: 'Location',
    it: 'Posizione',
    ru: 'Локация',
    de: 'Location',
  },
  rsvp: {
    en: 'RSVP',
    it: 'Conferma',
    ru: 'Подтверждение',
    de: 'RSVP',
  },
  
  // Home Page
  weddingTitle: {
    en: 'Liliia & Peter',
    it: 'Liliia & Peter',
    ru: 'Лилия и Пётр',
    de: 'Liliia & Peter',
  },
  weddingSubtitle: {
    en: 'Are joyfully tying the knot and they can\'t wait to celebrate with you!',
    it: 'Si uniscono in matrimonio e non vedono l\'ora di festeggiare con voi!',
    ru: 'С радостью связывают свои судьбы и с нетерпением ждут возможности отпраздновать с вами!',
    de: 'Are joyfully tying the knot and they can\'t wait to celebrate with you!',
  },
  
  // Event Details
  eventDetails: {
    en: 'Event Details',
    it: 'Dettagli Evento',
    ru: 'Детали мероприятия',
    de: 'Event Details',
  },
  dateTime: {
    en: 'Date & Time',
    it: 'Data e Ora',
    ru: 'Дата и время',
    de: 'Datum & Uhrzeit',
  },
  eventDate: {
    en: 'Saturday, June 27th, 2026',
    it: 'Sabato 27 Giugno 2026',
    ru: 'Суббота, 27 июня 2026',
    de: 'Samstag, 27. Juni 2026',
  },
  ceremonyTime: {
    en: 'Ceremony at 4:00 PM',
    it: 'Cerimonia alle 16:00',
    ru: 'Церемония в 16:00',
    de: 'Ceremonie um 16:00 Uhr',
  },
  locationTitle: {
    en: 'Location',
    it: 'Luogo',
    ru: 'Место проведения',
    de: 'Location',
  },
  venueName: {
    en: 'Castello di Rocca Grimalda',
    it: 'Castello di Rocca Grimalda',
    ru: 'Замок Рокка-Гримальда',
    de: 'Castello di Rocca Grimalda',
  },
  Address: {
    en: 'Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia',
    it: 'Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia',
    ru: 'Пьяцца Сенаторе Боргатта, 2, 15078 Рокка-Гримальда AL, Италия',
    de: 'Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia',
  },
  seeYouThere: {
    en: 'See You There?',
    it: 'Ci Vediamo Lì?',
    ru: 'Увидимся там?',
    de: 'See You There?',
  },
  dressCode: {
    en: 'Dress Code',
    it: 'Dress Code',
    ru: 'Код одежды',
    de: 'Dress Code',
  },
  dressCodeDescription: {
    en: 'Colorful, modern and elegant',
    it: 'Colori, moderno e elegante',
    ru: 'Красивый, современный и элегантный',
    de: 'Colorful, modern and elegant',
  },

  giftMessage: {
    en: 'Your presence would be the greatest gift, but if you wish to honor us with a gift, a contribution to our honeymoon fund would be warmly appreciated.',
    it: 'La tua presenza sarebbe il più grande regalo, ma se desideri onorarci con un regalo, una donazione al nostro fondo di nozze sarebbe apprezzata.',
    ru: 'Ваше присутствие будет для нас лучшим подарком, но если вы хотите почтить нас подарком, мы будем искренне благодарны за вклад в наш медовый месяц.',
    de: 'Your presence would be the greatest gift, but if you wish to honor us with a gift, a contribution to our honeymoon fund would be warmly appreciated.',
  },

  rsvpByDate: {
    en: 'Kindly RSVP by February 1st, 2026.',
    it: 'Fateci sapere entro il 1° Febbraio 2026.',
    ru: 'Пожалуйста, подтвердите ваше присутствие до 1 февраля 2026 года.',
    de: 'Kindly RSVP by February 1st, 2026.',
  },

  rsvpButton: {
    en: 'RSVP Now',
    it: 'Conferma Ora',
    ru: 'Подтвердить',
    de: 'RSVP Now',
  },

  // Countdown 
  countdownTitle: {
    en: 'Countdown to the Big Day!',
    it: 'Conto alla rovescia per il grande giorno!',
    ru: 'Обратный отсчет до важного дня!',
    de: 'Countdown to the Big Day!',
  },
  days: {
    en: 'days',
    it: 'giorni',
    ru: 'дней',
    de: 'Tage',
  },
  hours: {
    en: 'hours',
    it: 'ore',
    ru: 'часов',
    de: 'Stunden',
  },
  minutes: {
    en: 'minutes',
    it: 'minuti',
    ru: 'минут',
    de: 'Minuten',
  },
  seconds: {
    en: 'seconds',
    it: 'secondi',
    ru: 'секунд',
    de: 'Sekunden',
  },
  loadingCountdown: {
    en: 'Loading countdown...',
    it: 'Caricamento conto alla rovescia...',
    ru: 'Загрузка обратного отсчета...',
    de: 'Loading countdown...',
  },
  
  // RSVP
  rsvpTitle: {
    en: 'RSVP',
    it: 'Conferma',
    ru: 'Подтверждение',
    de: 'RSVP',
  },
  rsvpDescription: {
    en: 'Please let us know if you can attend our special day',
    it: 'Fateci sapere se potete partecipare al nostro giorno speciale',
    ru: 'Пожалуйста, сообщите нам, если вы сможете присутствовать на нашем особом дне',
    de: 'Please let us know if you can attend our special day',
  },
  rsvpPageTitle: {
    en: 'Will You Be There?',
    it: 'Ci Sarete?',
    ru: 'Вы будете там?',
    de: 'Will You Be There?',
  },
  rsvpPageSubtitle: {
    en: 'Please let us know if you can make it by May 1st, 2026.',
    it: 'Fateci sapere entro il 1° Maggio 2026.',
    ru: 'Пожалуйста, сообщите нам, если вы сможете присутствовать до 1 мая 2026 года.',
    de: 'Please let us know if you can make it by May 1st, 2026.',
  },
  selectName: {
    en: 'Name',
    it: 'Nome',
    ru: 'Имя',
    de: 'Name',
  },
  surname: {
    en: 'Surname',
    it: 'Cognome',
    ru: 'Фамилия',
    de: 'Nachname',
  },
  chooseName: {
    en: 'Type your name',
    it: 'Inizia a digitare e seleziona il tuo nome',
    ru: 'Начните вводить и выберите ваше имя',
    de: 'Type your name',
  },
  loading: {
    en: 'Loading...',
    it: 'Caricamento...',
    ru: 'Загрузка...',
    de: 'Loading...',
  },
  confirmName: {
    en: 'Type your name to confirm',
    it: 'Digita il tuo nome per confermare',
    ru: 'Введите ваше имя для подтверждения',
    de: 'Type your name to confirm',
  },
  startTyping: {
    en: 'Type your name here',
    it: 'Scrivi il tuo nome qui',
    ru: 'Введите ваше имя здесь',
    de: 'Type your name here',
  },
  accept: {
    en: 'Accept',
    it: 'Accetto',
    ru: 'Принять',
    de: 'Accept',
  },
  decline: {
    en: 'Decline',
    it: 'Declino',
    ru: 'Отказаться',
    de: 'Decline',
  },
  thankYou: {
    en: 'Thank You!',
    it: 'Grazie!',
    ru: 'Спасибо!',
    de: 'Thank You!',
  },
  rsvpReceived: {
    en: 'Your RSVP has been received!',
    it: 'La tua conferma è stata ricevuta!',
    ru: 'Ваше подтверждение получено!',
    de: 'Your RSVP has been received!',
  },
  excitedToCelebrate: {
    en: 'We\'re so excited to celebrate with you.',
    it: 'Siamo entusiasti di festeggiare con voi.',
    ru: 'Мы так рады отпраздновать с вами.',
    de: 'We\'re so excited to celebrate with you.',
  },
  backToHome: {
    en: 'Back to Home',
    it: 'Torna alla Home',
    ru: 'Вернуться на главную',
    de: 'Back to Home',
  },
  errorLoadingGuests: {
    en: 'Failed to load guests',
    it: 'Impossibile caricare gli ospiti',
    ru: 'Не удалось загрузить гостей',
    de: 'Failed to load guests',
  },
  pleaseSelectName: {
    en: 'Please type your name.',
    it: 'Per favore inserisci il tuo nome.',
    ru: 'Пожалуйста, введите ваше имя.',
    de: 'Please type your name.',
  },
  nameConfirmation: {
    en: 'Name confirmation',
    it: 'Conferma nome',
    ru: 'Подтверждение имени',
    de: 'Name confirmation',
  },
  nameMustMatch: {
    en: 'Typed name must match the selected name.',
    it: 'Il nome digitato deve corrispondere a quello selezionato.',
    ru: 'Введенное имя должно совпадать с выбранным именем.',
    de: 'Typed name must match the selected name.',
  },
  submissionFailed: {
    en: 'Submission failed',
    it: 'Invio fallito',
    ru: 'Отправка не удалась',
    de: 'Submission failed',
  },
  rsvpSent: {
    en: 'RSVP sent!',
    it: 'Conferma inviata!',
    ru: 'Подтверждение отправлено!',
    de: 'RSVP sent!',
  },
  thankYouStatus: {
    en: 'Thank you. Status:',
    it: 'Grazie. Stato:',
    ru: 'Спасибо. Статус:',
    de: 'Thank you. Status:',
  },

  // Food Preferences
  selectFoodPreference: {
    en: 'Food preference',
    it: 'Preferenza culinaria',
    ru: 'Предпочтение в еде',
    de: 'Food preference',
  },
  chooseFoodPreference: {
    en: 'Choose your food preference',
    it: 'Scegli la tua preferenza culinaria',
    ru: 'Выберите ваше предпочтение в еде',
    de: 'Choose your food preference',
  },
  foodPreferenceRequired: {
    en: 'Food preference required',
    it: 'Preferenza culinaria richiesta',
    ru: 'Необходимо указать предпочтение в еде',
    de: 'Food preference required',
  },
  pleaseSelectFoodPreference: {
    en: 'Please select your food preference.',
    it: 'Seleziona la tua preferenza culinaria.',
    ru: 'Пожалуйста, выберите ваше предпочтение в еде.',
    de: 'Please select your food preference.',
  },
  foodPreferenceError: {
    en: 'Failed to load food preferences',
    it: 'Impossibile caricare le preferenze culinarie',
    ru: 'Не удалось загрузить предпочтения в еде',
    de: 'Failed to load food preferences',
  },
  foodPreferenceLoading: {
    en: 'Loading food preferences...',
    it: 'Caricamento preferenze culinarie...',
    ru: 'Загрузка предпочтений в еде...',
    de: 'Loading food preferences...',
  },

  // Gallery
  galleryTitle: {
    en: 'Our Moments',
    it: 'I Nostri Momenti',
    ru: 'Наши моменты',
    de: 'Our Moments',
  },
  galleryDescription: {
    en: 'A collection of memories leading up to our special day.',
    it: 'Una raccolta di ricordi che ci hanno portato al nostro giorno speciale.',
    ru: 'Коллекция воспоминаний, ведущих к нашему особому дню.',
    de: 'A collection of memories leading up to our special day.',
  },

  // Location
  howToGetThere: {
    en: 'How To Get There',
    it: 'Come Arrivare',
    ru: 'Как добраться',
    de: 'How To Get There',
  },
  cantWaitToSeeYou: {
    en: 'We can\'t wait to see you in Rocca Grimalda.',
    it: 'Non vediamo l\'ora di vedervi a Rocca Grimalda.',
    ru: 'Мы не можем дождаться, когда увидим вас в Рокка-Гримальда.',
    de: 'We can\'t wait to see you in Rocca Grimalda.',
  },
  venueAddress: {
    en: 'Venue Address',
    it: 'Indirizzo',
    ru: 'Адрес места проведения',
    de: 'Venue Address',
  },
  openInGoogleMaps: {
    en: 'Open in Google Maps',
    it: 'Apri in Google Maps',
    ru: 'Открыть в Google Maps',
    de: 'Open in Google Maps',
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
