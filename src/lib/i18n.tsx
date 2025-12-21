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
    en: 'Ceremony at 5:00 PM',
    it: 'Cerimonia alle 17:00',
    ru: 'Церемония в 17:00',
    de: 'Ceremonie um 17:00 Uhr',
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

  // FAQs
  faqsTitle: {
    en: 'FAQs',
    it: 'FAQs',
    ru: 'FAQs',
    de: 'FAQs',
  },
  faqQuestion1: {
    en: 'What time should I arrive?',
    it: 'A che ora devo arrivare?',
    ru: 'Во сколько мне нужно приехать?',
    de: 'Um wie viel Uhr sollte ich ankommen?',
  },
  faqAnswer1: {
    en: 'Please arrive at least 30 minutes before the ceremony starts at 5:00 PM to find your seat and settle in.',
    it: 'Si prega di arrivare almeno 30 minuti prima dell\'inizio della cerimonia alle 17:00 per trovare il proprio posto e sistemarsi.',
    ru: 'Пожалуйста, приезжайте как минимум за 30 минут до начала церемонии в 17:00, чтобы найти свое место и устроиться.',
    de: 'Bitte komme mindestens 30 Minuten vor Beginn der Zeremonie um 17:00 Uhr, um deinen Platz zu finden und dich einzurichten.',
  },
  faqQuestion2: {
    en: 'Is there parking available?',
    it: 'C\'è parcheggio disponibile?',
    ru: 'Есть ли парковка?',
    de: 'Gibt es Parkmöglichkeiten?',
  },
  faqAnswer2: {
    en: 'Yes, there is free parking available near the venue. Additional street parking is also available in the village.',
    it: 'Sì, c\'è parcheggio gratuito disponibile vicino alla location. Ulteriore parcheggio su strada è disponibile nel villaggio.',
    ru: 'Да, рядом с местом проведения есть бесплатная парковка. Дополнительная уличная парковка также доступна в деревне.',
    de: 'Ja, es gibt kostenlose Parkplätze in der Nähe des Veranstaltungsortes. Zusätzliche Straßenparkplätze sind auch im Dorf verfügbar.',
  },
  faqQuestion3: {
    en: 'Can I bring a plus one?',
    it: 'Posso portare un accompagnatore?',
    ru: 'Могу ли я взять с собой гостя?',
    de: 'Kann ich eine Begleitung mitbringen?',
  },
  faqAnswer3: {
    en: 'Due to venue capacity, we can only accommodate guests named on the invitation. Please contact us if you have any questions.',
    it: 'A causa della capacità della location, possiamo ospitare solo gli invitati nominati sull\'invito. Contattateci per qualsiasi domanda.',
    ru: 'Из-за ограниченной вместимости площадки мы можем принять только гостей, указанных в приглашении. Пожалуйста, свяжитесь с нами, если у вас есть вопросы.',
    de: 'Aufgrund der Kapazität des Veranstaltungsortes können wir nur Gäste aufnehmen, die auf der Einladung genannt sind. Bitte kontaktiere uns bei Fragen.',
  },
  faqQuestion4: {
    en: 'What if I have dietary restrictions?',
    it: 'E se ho restrizioni alimentari?',
    ru: 'Что делать, если у меня есть диетические ограничения?',
    de: 'Was ist, wenn ich besondere Ernährungsbedürfnisse habe?',
  },
  faqAnswer4: {
    en: 'Please let us know your dietary preferences when you RSVP. We will do our best to accommodate all dietary needs.',
    it: 'Fateci sapere le vostre preferenze alimentari quando confermate la partecipazione. Faremo del nostro meglio per soddisfare tutte le esigenze alimentari.',
    ru: 'Пожалуйста, сообщите нам о ваших предпочтениях в еде при подтверждении участия. Мы сделаем все возможное, чтобы учесть все диетические потребности.',
    de: 'Bitte teile uns deine Ernährungspräferenzen bei der RSVP mit. Wir werden unser Bestes tun, um alle Ernährungsbedürfnisse zu berücksichtigen.',
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
