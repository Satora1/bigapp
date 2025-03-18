"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { deoptional, z, ZodType } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";



//interface Props<T extends FieldValues>
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T
  onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>
  type: "SIGN_IN" | "SIGN_UP"
}
const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }:
  Props<T>) => {
  const isSignIn = type === "SIGN_IN"
  const form: UseFormReturn<T> =
    useForm({
      resolver: zodResolver(schema),
      defaultValues: defaultValues as DefaultValues<T>,
    })
  const handleSubmit: SubmitHandler<T> = async (data) => { };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-emibold text-white">
        {isSignIn ? "Welcom back to bookwise" : "Create an account"}
      </h1>
      <p className="text-light-100">
        {isSignIn ? "access the vast collection of resources, and stay updated" : "Pleas fill in the form to create an account"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((field) =>
          (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload />
                    ) : (
                      <Input required type={
                        { FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      } {...field} />

                    )}
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "Create an account" : "Already have an account?"}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-primary" >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>

      </p>
    </div>

  )
}

export default AuthForm