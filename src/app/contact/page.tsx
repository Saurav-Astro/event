
'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { handleContactSubmission } from "@/lib/actions";
import { LocationMap } from "@/components/ui/expand-map";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleContactSubmission(values);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: `Thanks for reaching out, ${values.name}. We'll get back to you soon.`,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.message,
      });
    }
  }

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.336636294333!2d77.2950106150791!3d28.500558982470784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce7a2065e7da7%3A0x434b9514f7035a1!2sManav%20Rachna%20International%20Institute%20of%20Research%20and%20Studies!5e0!3m2!1sen!2sus!4v1687890123456";

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Get In Touch</CardTitle>
                <CardDescription>Have a question? Want to volunteer or sponsor? Drop us a line!</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
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
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Your message..." className="min-h-[150px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                           {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        <div className="flex flex-col items-center justify-center space-y-4 pt-8 md:pt-16">
            <div className="text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-widest">Our Location</p>
                <h3 className="text-xl font-semibold mt-1">Find us on Campus</h3>
            </div>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <LocationMap 
                location="Manav Rachna, Faridabad"
                coordinates="28.5005° N, 77.2950° E"
                embedUrl={mapEmbedUrl}
              />
            </div>
            <div className="text-center text-muted-foreground text-sm max-w-xs">
                <p>Manav Rachna International Institute of Research and Studies</p>
                <p>Sector 43, Delhi-Surajkund Road, Faridabad, Haryana</p>
            </div>
        </div>
      </div>
    </div>
  );
}
