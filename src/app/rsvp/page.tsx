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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  foodPreference: z.string({ required_error: "Please select a food preference." }),
  guestCount: z.coerce.number().min(1, {
    message: "Please enter the number of guests.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  hasAllergies: z.enum(["yes", "no"], {
    required_error: "Please select if you have allergies.",
  }),
  allergyDetails: z.string().optional(),
}).refine((data) => {
  if (data.hasAllergies === "yes" && !data.allergyDetails?.trim()) {
    return false;
  }
  return true;
}, {
  message: "Please provide details about your allergies.",
  path: ["allergyDetails"],
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
  const [hasAllergies, setHasAllergies] = useState<string>("");

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      foodPreference: "",
      guestCount: 1,
      email: "",
      hasAllergies: undefined,
      allergyDetails: "",
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
      const body: any = {
        name: values.name,
        surname: values.surname,
        status,
        guestCount: values.guestCount,
        email: values.email,
        hasAllergies: values.hasAllergies,
        allergyDetails: values.hasAllergies === "yes" ? values.allergyDetails : "",
      };
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
    const hasAllergyValidation = v.hasAllergies === "no" || (v.hasAllergies === "yes" && v.allergyDetails?.trim());
    return !!v.name && !!v.surname && !!v.foodPreference && v.guestCount >= 1 && !!v.email && !!v.hasAllergies && hasAllergyValidation;
  }

  function shouldShowDeclineButton() {
    const v = form.getValues();
    const hasAllergyValidation = v.hasAllergies === "no" || (v.hasAllergies === "yes" && v.allergyDetails?.trim());
    return !!v.name && !!v.surname && v.guestCount >= 1 && !!v.email && !!v.hasAllergies && hasAllergyValidation;
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">{t('selectName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('startTypingName')} {...field} className="w-full" />
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
                            <Input placeholder={t('startTypingSurname')} {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                            value={field.value}
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

                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{t('guestCount')}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder={t('guestCountPlaceholder')}
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{t('email')}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasAllergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Allergies/Food Intolerances</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              setHasAllergies(value);
                              field.onChange(value);
                            }}
                            value={field.value}
                            className="flex flex-row space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="allergies-yes" />
                              <Label htmlFor="allergies-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="allergies-no" />
                              <Label htmlFor="allergies-no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {hasAllergies === "yes" && (
                    <FormField
                      control={form.control}
                      name="allergyDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Please specify your allergies</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Please describe your allergies..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}



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
