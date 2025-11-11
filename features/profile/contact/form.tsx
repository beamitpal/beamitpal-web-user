"use client";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

function ContactForm() {
    return (
        <Panel id="contact">
            <PanelHeader>
                <PanelTitle>Ask Question</PanelTitle>
            </PanelHeader>

            <PanelContent>
                <FormForContacting />
            </PanelContent>
        </Panel>
    )
}

export default ContactForm;



const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(5, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

function FormForContacting() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema) as any,
    });

    async function onSubmit(data: FormData) {
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB_3_API,
                    ...data,
                }),
            });
            if (res.ok) {
                toast.success("Message sent successfully!");
                reset();
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Contact form error:", error);
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldContent>
                    <Input type="text" placeholder="Your Name" {...register("name")} />
                </FieldContent>
                <FieldError errors={errors.name ? [errors.name] : []} />
            </Field>
            <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                    <Input type="email" placeholder="you@email.com" {...register("email")} />
                </FieldContent>
                <FieldError errors={errors.email ? [errors.email] : []} />
            </Field>
            <Field>
                <FieldLabel>Message</FieldLabel>
                <FieldContent>
                    <Textarea placeholder="Type your message..." rows={5} {...register("message")} />
                </FieldContent>
                <FieldError errors={errors.message ? [errors.message] : []} />
            </Field>
            <Button type="submit" disabled={isSubmitting}>
               <Send /> {isSubmitting ? "Sending..." : "Send"}
            </Button>
        </form>
    );
}