"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet doit contenir au moins 2 caractères." }),
  company: z.string().optional(),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  phone: z.string().optional(),
  subject: z.enum(
    [
      "Demande de devis Site Vitrine",
      "Demande de devis E-commerce",
      "Demande de devis Application Web",
      "Question générale",
      "Autre",
    ],
    { required_error: "Veuillez sélectionner un sujet." },
  ),
  message: z
    .string()
    .min(10, { message: "Votre message doit contenir au moins 10 caractères." })
    .max(1000, { message: "Votre message ne doit pas dépasser 1000 caractères." }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité.",
  }),
})

export default function ContactFormSection() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      privacyPolicy: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Message Envoyé !",
          description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
          variant: "default",
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          title: "Erreur !",
          description: errorData.error || "Une erreur s'est produite lors de l'envoi du message.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur !",
        description: "Une erreur s'est produite lors de l'envoi du message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-card p-8 sm:p-10 rounded-2xl shadow-2xl">
      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Envoyez-nous un message.</h3>
      <p className="text-muted-foreground mb-8">Nous sommes impatients de discuter de votre projet.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Nom complet *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Jean Dupont"
                      {...field}
                      className="bg-background border-border/70 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">Société (Optionnel)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom de votre entreprise"
                      {...field}
                      className="bg-background border-border/70 focus:border-brand-blue focus:ring-brand-blue"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">Adresse e-mail *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ex: jean.dupont@example.com"
                    {...field}
                    className="bg-background border-border/70 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">Téléphone (Optionnel)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Ex: +33 6 12 34 56 78"
                    {...field}
                    className="bg-background border-border/70 focus:border-brand-blue focus:ring-brand-blue"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">Sujet de votre demande *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border/70 focus:border-brand-blue focus:ring-brand-blue">
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Demande de devis Site Vitrine">Demande de devis Site Vitrine</SelectItem>
                    <SelectItem value="Demande de devis E-commerce">Demande de devis E-commerce</SelectItem>
                    <SelectItem value="Demande de devis Application Web">Demande de devis Application Web</SelectItem>
                    <SelectItem value="Question générale">Question générale</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">Votre message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez votre projet, vos questions ou vos besoins..."
                    className="min-h-[140px] bg-background border-border/70 focus:border-brand-blue focus:ring-brand-blue"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border/70 p-4 bg-background/50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="privacyPolicy"
                    className="border-muted-foreground data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="privacyPolicy" className="text-sm font-normal text-muted-foreground">
                    J'accepte la{" "}
                    <Link
                      href="/politique-de-confidentialite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-brand-blue hover:text-brand-blue/80"
                    >
                      politique de confidentialité
                    </Link>
                    .*
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-brand-blue-foreground rounded-full py-3.5 text-base font-semibold group transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer votre message
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Nous nous engageons à vous répondre dans les 24-48h ouvrées.
      </p>
    </div>
  )
}
