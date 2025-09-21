'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'it' : 'en');
  };

  const nextLanguage = language === 'en' ? 'it' : 'en';
  const tooltipText = language === 'en' 
    ? 'Switch to Italian' 
    : 'Passa all\'inglese';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="ml-2"
            aria-label={tooltipText}
          >
            <span className="text-xl">
              {language === 'en' ? '🇮🇹' : '🇬🇧'}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
