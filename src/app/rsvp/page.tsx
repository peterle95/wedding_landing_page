"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PixelatedCard } from "@/components/ui/pixelated-card";
import { PixelIcon } from "@/components/pixel-icon";
import Link from "next/link";

const rsvpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your full name.",
  }),
  attendance: z.enum(["accepts", "declines"], {
    required_error: "Please select an option.",
  }),
  dietary: z.string().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

export default function RsvpPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: "",
      dietary: "",
    },
  });

  function onSubmit(data: RsvpFormValues) {
    console.log("RSVP Submitted:", data);
    toast({
      title: "RSVP Sent!",
      description: "Thank you for your response.",
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <PixelatedCard title="Thank You!">
          <div className="text-center space-y-6">
            <PixelIcon icon="heart" className="w-16 h-16 text-accent mx-auto" />
            <h2 className="text-2xl font-bold">Your RSVP has been received!</h2>
            <p className="text-muted-foreground">
              We're so excited to celebrate with you.
            </p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
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
            <PixelIcon icon="rsvp" className="w-8 h-8 text-primary"/>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            Will You Be There?
            </h1>
            <PixelIcon icon="rsvp" className="w-8 h-8 text-primary"/>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Please let us know if you can make it by May 1st, 2026.
        </p>
      </header>
      
      <div className="max-w-2xl mx-auto">
        <PixelatedCard title="RSVP Form">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Full Name(s)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe & John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendance"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg">Will you attend?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="accepts" />
                          </FormControl>
                          <FormLabel className="font-normal text-base">
                            Joyfully Accepts
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="declines" />
                          </FormControl>
                          <FormLabel className="font-normal text-base">
                            Regretfully Declines
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Dietary Restrictions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please list any allergies or dietary needs..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full">Submit RSVP</Button>
            </form>
          </Form>
        </PixelatedCard>
      </div>
    </div>
  );
}
