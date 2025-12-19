"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PixelatedCard } from "@/components/ui/pixelated-card";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/i18n";

const rsvpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name.",
  }),
  surname: z.string().min(2, {
    message: "Please enter your surname.",
  }),
  foodPreference: z.string().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

export default function RsvpPage() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [foodOptions, setFoodOptions] = useState<string[]>([]);
  const [loadingFoodOptions, setLoadingFoodOptions] = useState(true);
  const [selectedFoodPreference, setSelectedFoodPreference] = useState("");

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      foodPreference: "",
    },
  });

  useEffect(() => {
    async function loadFoodOptions() {
      try {
        setLoadingFoodOptions(true);
        const res = await fetch(`/api/food-preferences?lang=${language}`);
        const data = await res.json();
        if (res.ok) setFoodOptions(data.foodOptions || []);
        else throw new Error(data.error || t('foodPreferenceError'));
      } catch (e: any) {
        toast({
          title: t('error'),
          description: e.message,
          variant: "destructive"
        });
      } finally {
        setLoadingFoodOptions(false);
      }
    }
    loadFoodOptions();
  }, [language, toast, t]);

  // no confirm name matching

  async function handleSubmit(status: "Accepted" | "Declined") {
    const valid = await form.trigger();
    const values = form.getValues();
    if (!valid || !values.name || !values.surname) {
      toast({
        title: t('error'),
        description: t('pleaseSelectName'),
        variant: "destructive"
      });
      return;
    }

    if (status === "Accepted" && !selectedFoodPreference) {
      toast({
        title: t('foodPreferenceRequired'),
        description: t('pleaseSelectFoodPreference'),
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      const body: any = { name: values.name, surname: values.surname, status };
      if (status === "Accepted" && selectedFoodPreference) {
        body.foodPreference = selectedFoodPreference;
      }

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('submissionFailed'));
      toast({
        title: t('rsvpSent'),
        description: `${t('thankYouStatus')} ${status === 'Accepted' ? t('accept') : t('decline')}`
      });
      setSubmitted(true);
    } catch (e: any) {
      toast({
        title: t('error'),
        description: e.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Helper functions to determine when buttons should be shown
  function shouldShowAcceptButton() {
    const v = form.getValues();
    return !!v.name && !!v.surname && !!selectedFoodPreference;
  }

  function shouldShowDeclineButton() {
    const v = form.getValues();
    return !!v.name && !!v.surname;
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <PixelatedCard title={t('thankYou')}>
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">{t('rsvpReceived')}</h2>
            <p className="text-muted-foreground">{t('excitedToCelebrate')}</p>
            <Button asChild>
              <Link href="/">{t('backToHome')}</Link>
            </Button>
          </div>
        </PixelatedCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center space-y-2 mb-12">
        <div className="inline-flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            {t('rsvpPageTitle')}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('rsvpPageSubtitle')}
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <PixelatedCard title={t('rsvpTitle')}>
          <div className="space-y-6">
            <div>
              <Form {...form}>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{t('selectName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('startTyping')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{t('surname') || 'Surname'}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('startTyping')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="foodPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{t('selectFoodPreference')}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              setSelectedFoodPreference(value);
                              field.onChange(value);
                            }}
                            value={selectedFoodPreference}
                            disabled={loadingFoodOptions}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={loadingFoodOptions ? t('loading') : t('chooseFoodPreference')} />
                            </SelectTrigger>
                            <SelectContent>
                              {foodOptions.map((option, idx) => (
                                <SelectItem key={`${option}-${idx}`} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      onClick={() => handleSubmit("Accepted")}
                      disabled={!shouldShowAcceptButton() || submitting}
                      className="w-full"
                    >
                      {t('accept')}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleSubmit("Declined")}
                      disabled={!shouldShowDeclineButton() || submitting}
                      className="w-full"
                    >
                      {t('decline')}
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </PixelatedCard>
      </div>
    </div>
  );
}
