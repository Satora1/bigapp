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
import { redirect, useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "@/components/admin/ColorPicker";
import { createBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";



//interface Props<T extends FieldValues>
interface Props extends Partial<Book> {
    type?: "create" | "update"
}
const BookForm = ({ type,
    ...book }:
    Props) => {
    const router = useRouter()


    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            genre: "All",
            price: 0,
            soldPrice: 0,
            isSold: false,
            priceBought: 0,
            rating: 1,
            totalCopies: 1,
            coverUrl: "",
            coverUrl2: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
            vintedLink: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values);
        console.log("✅ onSubmit fired:", values);
        if (result.success) {
            router.push(`/admin/books/${result.data.id}`)
            redirect(`/admin/books/`)
        }
        else toast("error", {
            description: result.message,
        })
    };

    const onError = (errors: any) => {
        console.log("❌ validation errors:", errors);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">

                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Title                        </FormLabel>
                            <FormControl>

                                <Input required
                                    placeholder="Title"
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"vintedLink"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Vinted Link                        </FormLabel>
                            <FormControl>

                                <Input required
                                    placeholder="Link"
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"author"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Made By                           </FormLabel>
                            <FormControl>

                                <Input required
                                    placeholder="Author"
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"genre"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Genre
                            </FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="Book genre"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name={"rating"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Rating
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={5}
                                    placeholder="Book rating"
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name={"totalCopies"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Totla Copies
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={100}
                                    placeholder="Total Copies"
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"price"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Price
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={100000}
                                    placeholder="Price"
                                    step={0.01}
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"priceBought"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Price Bought
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={100000}
                                    step={0.01}
                                    placeholder="Price"
                                    {...field}
                                    className="book-form_input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverUrl"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Image 1
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    type="image"
                                    accept="image/*"
                                    placeholder="Upload a book cover"
                                    folder="books/covers"
                                    variant="light"
                                    onFileChange={(url) => field.onChange(url)}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverUrl2"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Image 2
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    type="image"
                                    accept="image/*"
                                    placeholder="Upload a book cover"
                                    folder="books/covers"
                                    variant="light"
                                    onFileChange={(url) => field.onChange(url)}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"coverColor"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Primary Color
                            </FormLabel>
                            <FormControl>
                                <ColorPicker onPickerChange={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Desc
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Book description"{...field}
                                    rows={10} className="book-form_input" />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"videoUrl"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Video
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    type="video"
                                    accept="video/*"
                                    placeholder="Upload book triler"
                                    folder="books/videos"
                                    variant="light"
                                    onFileChange={field.onChange}
                                    value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"summary"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Summary
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Book Summary"{...field}
                                    rows={5} className="book-form_input" />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="book-form_btn text-white" onClick={() => console.log("ok")}>
                    Add Item to Library

                </Button>
            </form>
        </Form>


    )
}

export default BookForm;