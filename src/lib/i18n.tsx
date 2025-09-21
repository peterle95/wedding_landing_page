"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type Language = 'en' | 'it';

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
  },
  gallery: {
    en: 'Gallery',
    it: 'Galleria',
  },
  location: {
    en: 'Location',
    it: 'Posizione',
  },
  rsvp: {
    en: 'RSVP',
    it: 'Conferma',
  },
  
  // Home Page
  weddingTitle: {
    en: 'Liliia & Peter',
    it: 'Liliia & Peter',
  },
  weddingSubtitle: {
    en: 'Are joyfully tying the knot and they can\'t wait to celebrate with you!',
    it: 'Si uniscono in matrimonio e non vedono l\'ora di festeggiare con voi!',
  },
  
  // Event Details
  eventDetails: {
    en: 'Event Details',
    it: 'Dettagli Evento',
  },
  dateTime: {
    en: 'Date & Time',
    it: 'Data e Ora',
  },
  eventDate: {
    en: 'Saturday, June 6th, 2026',
    it: 'Sabato 6 Giugno 2026',
  },
  ceremonyTime: {
    en: 'Ceremony at 1:00 PM',
    it: 'Cerimonia alle 13:00',
  },
  locationTitle: {
    en: 'Location',
    it: 'Luogo',
  },
  venueName: {
    en: 'Castello di Rocca Grimalda',
    it: 'Castello di Rocca Grimalda',
  },
  Address: {
    en: 'Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia',
    it: 'Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia',
  },
  seeYouThere: {
    en: 'See You There?',
    it: 'Ci Vediamo Lì?',
  },

  giftMessage: {
    en: 'Your presence would be the greatest gift, but if you wish to honor us with a gift, a contribution to our honeymoon fund would be warmly appreciated.',
    it: 'La tua presenza sarebbe il più grande regalo, ma se desideri onorarci con un regalo, una donazione al nostro fondo honeymoon sarebbe apprezzata.',
  },

  rsvpByDate: {
    en: 'Kindly RSVP by May 1st, 2026.',
    it: 'Fateci sapere entro il 1° Maggio 2026.',
  },

  rsvpButton: {
    en: 'RSVP Now',
    it: 'Conferma Ora',
  },

   // Countdown 
   countdownTitle: {
    en: 'Countdown to the Big Day!',
    it: 'Conto alla rovescia per il grande giorno!',
  },
  days: {
    en: 'days',
    it: 'giorni',
  },
  hours: {
    en: 'hours',
    it: 'ore',
  },
  minutes: {
    en: 'minutes',
    it: 'minuti',
  },
  seconds: {
    en: 'seconds',
    it: 'secondi',
  },
  loadingCountdown: {
    en: 'Loading countdown...',
    it: 'Caricamento conto alla rovescia...',
  },
  
  // RSVP
  rsvpTitle: {
    en: 'RSVP',
    it: 'Conferma',
  },
  rsvpDescription: {
    en: 'Please let us know if you can attend our special day',
    it: 'Fateci sapere se potete partecipare al nostro giorno speciale',
  },
  rsvpButton: {
    en: 'RSVP Now',
    it: 'Conferma Ora',
  },
  rsvpPageTitle: {
    en: 'Will You Be There?',
    it: 'Ci Sarete?',
  },
  rsvpPageSubtitle: {
    en: 'Please let us know if you can make it by May 1st, 2026.',
    it: 'Fateci sapere entro il 1° Maggio 2026.',
  },
  selectName: {
    en: 'Select Your Name',
    it: 'Seleziona il tuo nome',
  },
  chooseName: {
    en: 'Choose your name',
    it: 'Scegli il tuo nome',
  },
  loading: {
    en: 'Loading...',
    it: 'Caricamento...',
  },
  confirmName: {
    en: 'Type Your Name To Confirm',
    it: 'Digita il tuo nome per confermare',
  },
  startTyping: {
    en: 'Start typing...',
    it: 'Inizia a scrivere...',
  },
  accept: {
    en: 'Accept',
    it: 'Accetto',
  },
  decline: {
    en: 'Decline',
    it: 'Declino',
  },
  thankYou: {
    en: 'Thank You!',
    it: 'Grazie!',
  },
  rsvpReceived: {
    en: 'Your RSVP has been received!',
    it: 'La tua conferma è stata ricevuta!',
  },
  excitedToCelebrate: {
    en: 'We\'re so excited to celebrate with you.',
    it: 'Siamo entusiasti di festeggiare con voi.',
  },
  backToHome: {
    en: 'Back to Home',
    it: 'Torna alla Home',
  },
  errorLoadingGuests: {
    en: 'Failed to load guests',
    it: 'Impossibile caricare gli ospiti',
  },
  pickYourName: {
    en: 'Pick your name',
    it: 'Seleziona il tuo nome',
  },
  pleaseSelectName: {
    en: 'Please select your name from the list.',
    it: 'Seleziona il tuo nome dalla lista.',
  },
  nameConfirmation: {
    en: 'Name confirmation',
    it: 'Conferma nome',
  },
  nameMustMatch: {
    en: 'Typed name must match the selected name.',
    it: 'Il nome digitato deve corrispondere a quello selezionato.',
  },
  submissionFailed: {
    en: 'Submission failed',
    it: 'Invio fallito',
  },
  rsvpSent: {
    en: 'RSVP sent!',
    it: 'Conferma inviata!',
  },
  thankYouStatus: {
    en: 'Thank you. Status:',
    it: 'Grazie. Stato:',
  },
  
  // Gallery
  galleryTitle: {
    en: 'Our Moments',
    it: 'I Nostri Momenti',
  },
  galleryDescription: {
    en: 'A collection of memories leading up to our special day.',
    it: 'Una raccolta di ricordi che ci hanno portato al nostro giorno speciale.',
  },

  // Location
  howToGetThere: {
    en: 'How To Get There',
    it: 'Come Arrivare',
  },
  cantWaitToSeeYou: {
    en: 'We can\'t wait to see you in Rocca Grimalda.',
    it: 'Non vediamo l\'ora di vedervi a Rocca Grimalda.',
  },
  venueAddress: {
    en: 'Venue Address',
    it: 'Indirizzo',
  },
  openInGoogleMaps: {
    en: 'Open in Google Maps',
    it: 'Apri in Google Maps',
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
