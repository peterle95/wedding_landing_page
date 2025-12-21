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
    de: 'Ort',
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
    de: 'Geben sich voller Freude das Jawort und können es kaum erwarten, mit dir zu feiern!',
  },
  
  // Event Details
  eventDetails: {
    en: 'Event Details',
    it: 'Dettagli Evento',
    ru: 'Детали мероприятия',
    de: 'Eventdetails',
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
    de: 'Ort',
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
    de: 'Wirst du da sein?',
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
    de: 'Farbenfroh, modern und elegant',
  },

  giftMessage: {
    en: 'Your presence would be the greatest gift, but if you wish to honor us with a gift, a contribution to our honeymoon fund would be warmly appreciated.',
    it: 'La tua presenza sarebbe il più grande regalo, ma se desideri onorarci con un regalo, una donazione al nostro fondo di nozze sarebbe apprezzata.',
    ru: 'Ваше присутствие будет для нас лучшим подарком, но если вы хотите почтить нас подарком, мы будем искренне благодарны за вклад в наш медовый месяц.',
    de: 'Deine Anwesenheit wäre das größte Geschenk, aber wenn du uns mit einem Geschenk ehren möchtest, würden wir uns sehr über einen Beitrag zu unserem Hochzeitsreisegeld freuen.',
  },

  rsvpByDate: {
    en: 'Kindly RSVP by March 1st, 2026.',
    it: 'Fateci sapere entro il 1° Marzo 2026.',
    ru: 'Пожалуйста, подтвердите ваше присутствие до 1 марта 2026 года.',
    de: 'Bitte teile uns bis zum 1. März 2026 mit, ob du kommen kannst.',
  },

  rsvpButton: {
    en: 'RSVP Now',
    it: 'Conferma Ora',
    ru: 'Подтвердить',
    de: 'RSVP Jetzt',
  },

  // Countdown 
  countdownTitle: {
    en: 'Countdown to the Big Day!',
    it: 'Conto alla rovescia per il grande giorno!',
    ru: 'Обратный отсчет до важного дня!',
    de: 'Countdown zum großen Tag!',
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
    it: 'Facci sapere se potrai partecipare al nostro giorno speciale',
    ru: 'Пожалуйста, сообщите нам, если вы сможете присутствовать на нашем особом дне',
    de: 'Bitte teile uns mit, ob du kommen kannst.',
  },
  rsvpPageTitle: {
    en: 'Will You Be There?',
    it: 'Ci Sarai?',
    ru: 'Вы будете там?',
    de: 'Wirst du da sein?',
  },
  rsvpPageSubtitle: {
    en: 'Please let us know if you can make it by March 1st, 2026.',
    it: 'Facci sapere entro il 1° Marzo 2026.',
    ru: 'Пожалуйста, сообщите нам, если вы сможете присутствовать до 1 марта 2026 года.',
    de: 'Bitte teile uns bis zum 1. März 2026 mit, ob du kommen kannst.',
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
    de: 'Gib deinen Namen ein',
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
    de: 'Gib deinen Namen ein, um zu bestätigen',
  },
  startTyping: {
    en: 'Type your name here',
    it: 'Scrivi il tuo nome qui',
    ru: 'Введите ваше имя здесь',
    de: 'Gib deinen Namen hier ein',
  },
  accept: {
    en: 'Accept',
    it: 'Accetto',
    ru: 'Принять',
    de: 'Akzeptieren',
  },
  decline: {
    en: 'Decline',
    it: 'Declino',
    ru: 'Отказаться',
    de: 'Ablehnen',
  },
  thankYou: {
    en: 'Thank You!',
    it: 'Grazie!',
    ru: 'Спасибо!',
    de: 'Danke!',
  },
  rsvpReceived: {
    en: 'Your RSVP has been received!',
    it: 'La tua conferma è stata ricevuta!',
    ru: 'Ваше подтверждение получено!',
    de: 'Dein RSVP wurde erhalten!',
  },
  excitedToCelebrate: {
    en: 'We\'re so excited to celebrate with you.',
    it: 'Siamo entusiasti di festeggiare con voi.',
    ru: 'Мы так рады отпраздновать с вами.',
    de: 'Wir freuen uns mit dir zu feiern.',
  },
  backToHome: {
    en: 'Back to Home',
    it: 'Torna alla Home',
    ru: 'Вернуться на главную',
    de: 'Zurück zur Startseite',
  },
  errorLoadingGuests: {
    en: 'Failed to load guests',
    it: 'Impossibile caricare gli ospiti',
    ru: 'Не удалось загрузить гостей',
    de: 'Fehler beim Laden der Gäste',
  },
  pleaseSelectName: {
    en: 'Please type your name.',
    it: 'Per favore inserisci il tuo nome.',
    ru: 'Пожалуйста, введите ваше имя.',
    de: 'Bitte gebe dein Name ein.',
  },
  nameConfirmation: {
    en: 'Name confirmation',
    it: 'Conferma nome',
    ru: 'Подтверждение имени',
    de: 'Name bestätigen',
  },
  nameMustMatch: {
    en: 'Typed name must match the selected name.',
    it: 'Il nome digitato deve corrispondere a quello selezionato.',
    ru: 'Введенное имя должно совпадать с выбранным именем.',
    de: 'Der eingegebene Name muss mit dem ausgewählten Namen übereinstimmen.',
  },
  submissionFailed: {
    en: 'Submission failed',
    it: 'Invio fallito',
    ru: 'Отправка не удалась',
    de: 'Abgabe fehlgeschlagen',
  },
  rsvpSent: {
    en: 'RSVP sent!',
    it: 'Conferma inviata!',
    ru: 'Подтверждение отправлено!',
    de: 'RSVP gesendet!',
  },
  thankYouStatus: {
    en: 'Thank you. Status:',
    it: 'Grazie. Stato:',
    ru: 'Спасибо. Статус:',
    de: 'Danke. Status:',
  },

  // Food Preferences
  selectFoodPreference: {
    en: 'Food preference',
    it: 'Preferenza culinaria',
    ru: 'Предпочтение в еде',
    de: 'Mahlzeitenpräferenz',
  },
  chooseFoodPreference: {
    en: 'Choose your food preference',
    it: 'Scegli la tua preferenza culinaria',
    ru: 'Выберите ваше предпочтение в еде',
    de: 'Wähle deine Mahlzeitenpräferenz',
  },
  foodPreferenceRequired: {
    en: 'Food preference required',
    it: 'Preferenza culinaria richiesta',
    ru: 'Необходимо указать предпочтение в еде',
    de: 'Mahlzeitenpräferenz erforderlich',
  },
  pleaseSelectFoodPreference: {
    en: 'Please select your food preference.',
    it: 'Seleziona la tua preferenza culinaria.',
    ru: 'Пожалуйста, выберите ваше предпочтение в еде.',
    de: 'Bitte wähle deine Mahlzeitenpräferenz.',
  },
  foodPreferenceError: {
    en: 'Failed to load food preferences',
    it: 'Impossibile caricare le preferenze culinarie',
    ru: 'Не удалось загрузить предпочтения в еде',
    de: 'Fehler beim Laden der Mahlzeitenpräferenzen',
  },
  foodPreferenceLoading: {
    en: 'Loading food preferences...',
    it: 'Caricamento preferenze culinarie...',
    ru: 'Загрузка предпочтений в еде...',
    de: 'Laden der Mahlzeitenpräferenzen...',
  },
  guestCount: {
    en: 'Number of Guests',
    it: 'Numero di Ospiti',
    ru: 'Количество гостей',
    de: 'Anzahl der Gäste',
  },
  guestCountPlaceholder: {
    en: 'How many people are you bringing?',
    it: 'Quante persone stai portando?',
    ru: 'Сколько человек вы приводите?',
    de: 'Wie viele Personen bringst du mit?',
  },
  email: {
    en: 'Email',
    it: 'Email',
    ru: 'Электронная почта',
    de: 'E-Mail',
  },
  emailPlaceholder: {
    en: 'Enter your email address',
    it: 'Inserisci il tuo indirizzo email',
    ru: 'Введите ваш адрес электронной почты',
    de: 'Gib deine E-Mail-Adresse ein',
  },

  // Gallery
  galleryTitle: {
    en: 'Our Moments',
    it: 'I Nostri Momenti',
    ru: 'Наши моменты',
    de: 'Unsere Momente',
  },
  galleryDescription: {
    en: 'A collection of memories leading up to our special day.',
    it: 'Una raccolta di ricordi che ci hanno portato al nostro giorno speciale.',
    ru: 'Коллекция воспоминаний, ведущих к нашему особому дню.',
    de: 'Eine Sammlung von Erinnerungen, die uns zu unserem besonderen Tag führen.',
  },

  // Location
  howToGetThere: {
    en: 'How To Get There',
    it: 'Come Arrivare',
    ru: 'Как добраться',
    de: 'Wie kommen ich dorthin?',
  },
  cantWaitToSeeYou: {
    en: 'We can\'t wait to see you in Rocca Grimalda.',
    it: 'Non vediamo l\'ora di vedervi a Rocca Grimalda.',
    ru: 'Мы не можем дождаться, когда увидим вас в Рокка-Гримальда.',
    de: 'Wir freuen uns darauf, dich in Rocca Grimalda zu sehen.',
  },
  venueAddress: {
    en: 'Venue Address',
    it: 'Indirizzo',
    ru: 'Адрес места проведения',
    de: 'Adresse des Veranstaltungsorts',
  },
  openInGoogleMaps: {
    en: 'Open in Google Maps',
    it: 'Apri in Google Maps',
    ru: 'Открыть в Google Maps',
    de: 'In Google Maps öffnen',
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
