"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ui/loader";
import { useTransition } from "react";
import { createProject } from "./new.action";
import { redirect } from "next/navigation";
import { error } from "console";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Un titre est requis.",
  }),
  description: z.string().min(1, {
    message: "Une description est requise.",
  }),
});

export type FormProjectType = z.infer<typeof formSchema>;

const FormNewProject = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await createProject(values);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du projet</FormLabel>
              <FormControl>
                <Input {...field} type="text" onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description du projet</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[150px] resize-none"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex gap-2">
          Créer
          {isPending && <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default FormNewProject;
