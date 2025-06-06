"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"

import { toast } from "sonner";
import { updateBook } from "@/lib/admin/actions/update";

// ✅ Zod schema tylko dla pól, które edytujesz
const soldSchema = z.object({
  soldPrice: z.number().min(0, "Cena nie może być ujemna"),
  isSold: z.boolean(),
});

type SoldFormValues = z.infer<typeof soldSchema>;

interface Props {
  bookId: string;
  defaultValues: SoldFormValues;
}

const UpdateSoldForm = ({ bookId, defaultValues }: Props) => {
  const router = useRouter();

  const form = useForm<SoldFormValues>({
    resolver: zodResolver(soldSchema),
    defaultValues,
  });

  const onSubmit = async (values: SoldFormValues) => {
    const result = await updateBook(bookId, values);

    if (result.success) {
      toast.success("Zaktualizowano dane książki!");
      router.refresh();
    } else {
      toast.error("Wystąpił błąd przy aktualizacji.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="soldPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena sprzedaży (zł)</FormLabel>
              <FormControl>
                <Input className="w-40 bg-white "
                  type="number"
                  step="0.01"
                  placeholder=" "
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />   

        <FormField
          control={form.control}
          name="isSold"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0 bg-white w-full p-4 rounded-md shadow-sm w-40 ">
              <FormControl>
                <Checkbox
                  id="isSold"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <FormLabel htmlFor="isSold" className="mb-0">
                Sprzedane
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit">Zapisz zmiany</Button>
      </form>
    </Form>
  );
};

export default UpdateSoldForm;
