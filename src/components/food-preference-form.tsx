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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PixelatedCard } from "@/components/ui/pixelated-card";
import { useLanguage } from "@/lib/i18n";

const foodPreferenceFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please select your name.",
  }),
  foodPreference: z.string().min(1, {
    message: "Please select your food preference.",
  }),
});

type FoodPreferenceFormValues = z.infer<typeof foodPreferenceFormSchema>;

interface FoodPreferenceFormProps {
  guests: string[];
  onSubmit?: () => void;
}

export function FoodPreferenceForm({ guests, onSubmit }: FoodPreferenceFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [foodOptions, setFoodOptions] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [loadingFoodOptions, setLoadingFoodOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FoodPreferenceFormValues>({
    resolver: zodResolver(foodPreferenceFormSchema),
    defaultValues: {
      name: "",
      foodPreference: "",
    },
  });

  useEffect(() => {
    async function loadFoodOptions() {
      try {
        const res = await fetch("/api/food-preferences");
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
  }, [toast, t]);

  async function handleSubmit(values: FoodPreferenceFormValues) {
    try {
      setSubmitting(true);
      const res = await fetch("/api/food-preferences/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedName,
          foodPreference: values.foodPreference
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('submissionFailed'));

      toast({
        title: t('foodPreferenceSent'),
        description: t('excitedToCelebrate')
      });

      // Reset form
      form.reset();
      setSelectedName("");

      if (onSubmit) {
        onSubmit();
      }
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

  return (
    <div className="max-w-2xl mx-auto">
      <PixelatedCard title={t('foodPreferenceTitle')}>
        <div className="space-y-6">
          <p className="text-muted-foreground">{t('foodPreferenceSubtitle')}</p>

          <Form {...form}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">{t('selectName')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setSelectedName(value);
                          field.onChange(value);
                        }}
                        value={selectedName}
                        disabled={loadingFoodOptions}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={loadingFoodOptions ? t('foodPreferenceLoading') : t('chooseName')} />
                        </SelectTrigger>
                        <SelectContent>
                          {guests.map((guest, idx) => (
                            <SelectItem key={`${guest}-${idx}`} value={guest}>
                              {guest}
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
                name="foodPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">{t('selectFoodPreference')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loadingFoodOptions || !selectedName}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={loadingFoodOptions ? t('foodPreferenceLoading') : t('chooseName')} />
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

              <Button
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
                disabled={!selectedName || submitting}
                className="w-full"
              >
                {t('foodPreferenceSent')}
              </Button>
            </div>
          </Form>
        </div>
      </PixelatedCard>
    </div>
  );
}
