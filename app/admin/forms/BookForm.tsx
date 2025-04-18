"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";




//interface Props<T extends FieldValues>
interface Props extends Partial<Book> {
    type?: "create" | "update"
}
const AuthForm = ({ type,
    ...book}:
    Props) => {
    const router = useRouter()


    const form = useForm<z.infer<typeof bookSchema>>
        ({
            resolver: zodResolver(bookSchema),
            defaultValues: {
                title: " ",
                description: " ",
                author: " ",
                dgenre: " ",
                rating: 1,
                totalCopies: 1,
                coverUrl: " ",
                coverCorol: " ",
                videoUrl: " ",
                summary: " ",
            }
        })
    const onSubmit = async (values: z.infer<typeof bookSchema>) => {

    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Title                            </FormLabel>
                            <FormControl>

                                <Input required
                                    placeholder="Book title"
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>


    )
}

export default AuthForm