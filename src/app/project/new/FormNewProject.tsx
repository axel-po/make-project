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
import { Checkbox } from "@/components/ui/checkbox";
import { type CategoryType } from "@/query/category.query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type TechnologiesType } from "@/query/technologies.query";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Un titre est requis.",
  }),
  description: z.string().min(1, {
    message: "Une description est requise.",
  }),
  category: z.string().min(1, {
    message: "Une catégorie est requise.",
  }),
  technologies: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Vous devez sélectionner une technologie.",
    }),
});

export type FormProjectType = z.infer<typeof formSchema>;

type FormNewProjectProps = {
  categories: CategoryType[];
  technologies: TechnologiesType;
};

const FormNewProject = ({ categories, technologies }: FormNewProjectProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      technologies: [],
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

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category?.id}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technologies"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
              </div>
              {technologies.map((technologie) => (
                <FormField
                  key={technologie.id}
                  control={form.control}
                  name="technologies"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={technologie.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(technologie.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    technologie.id,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== technologie.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {technologie.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
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
