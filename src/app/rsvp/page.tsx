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
import { PixelIcon } from "@/components/pixel-icon";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const rsvpFormSchema = z.object({
  confirmName: z.string().min(2, {
    message: "Please type your name to confirm.",
  }),
});

type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

export default function RsvpPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [guests, setGuests] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [loadingGuests, setLoadingGuests] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      confirmName: "",
    },
  });

  useEffect(() => {
    async function loadGuests() {
      try {
        const res = await fetch("/api/guests");
        const data = await res.json();
        if (res.ok) setGuests(data.guests || []);
        else throw new Error(data.error || "Failed to load guests");
      } catch (e: any) {
        toast({ title: "Error", description: e.message, variant: "destructive" });
      } finally {
        setLoadingGuests(false);
      }
    }
    loadGuests();
  }, [toast]);

  function namesMatch() {
    return (
      selectedName.trim().toLowerCase() ===
      (form.getValues("confirmName") || "").trim().toLowerCase()
    );
  }

  async function handleSubmit(status: "Accepted" | "Declined") {
    if (!selectedName) {
      toast({ title: "Pick your name", description: "Please select your name from the list.", variant: "destructive" });
      return;
    }
    const valid = await form.trigger();
    if (!valid || !namesMatch()) {
      toast({ title: "Name confirmation", description: "Typed name must match the selected name.", variant: "destructive" });
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: selectedName, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      toast({ title: "RSVP sent!", description: `Thank you. Status: ${status}.` });
      setSubmitted(true);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <PixelatedCard title="Thank You!">
          <div className="text-center space-y-6">
            <PixelIcon icon="heart" className="w-16 h-16 text-accent mx-auto" />
            <h2 className="text-2xl font-bold">Your RSVP has been received!</h2>
            <p className="text-muted-foreground">We're so excited to celebrate with you.</p>
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
          <PixelIcon icon="rsvp" className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">Will You Be There?</h1>
          <PixelIcon icon="rsvp" className="w-8 h-8 text-primary" />
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Please let us know if you can make it by May 1st, 2026.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <PixelatedCard title="RSVP">
          <div className="space-y-6">
            <div>
              <Form {...form}>
                <div className="space-y-6">
                  <FormItem>
                    <FormLabel className="text-lg">Select Your Name</FormLabel>
                    <FormControl>
                      <Select onValueChange={setSelectedName} value={selectedName} disabled={loadingGuests}>
                        <SelectTrigger>
                          <SelectValue placeholder={loadingGuests ? "Loading..." : "Choose your name"} />
                        </SelectTrigger>
                        <SelectContent>
                          {guests.map((g, idx) => (
                            <SelectItem key={`${g}-${idx}`} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="confirmName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Type Your Name To Confirm</FormLabel>
                        <FormControl>
                          <Input placeholder="Start typing..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      onClick={() => handleSubmit("Accepted")}
                      disabled={!selectedName || !namesMatch() || submitting}
                      className="w-full"
                    >
                      Accept
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleSubmit("Declined")}
                      disabled={!selectedName || !namesMatch() || submitting}
                      className="w-full"
                    >
                      Decline
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
