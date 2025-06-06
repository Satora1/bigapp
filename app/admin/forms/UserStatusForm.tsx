'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUSer } from '@/lib/admin/actions/updateUser';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const userSchema = z.object({
  status: z.string(),
  role: z.string(),
});

type UserUpdateValues = z.infer<typeof userSchema>;

interface Props {
  userId: string;
  defaultValues: UserUpdateValues;
}

const UserStatusForm = ({ userId, defaultValues }: Props) => {
  const router = useRouter();

  const form = useForm<UserUpdateValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (values: UserUpdateValues) => {
    const result = await updateUSer(userId, values.status, values.role, { status: values.status, role: values.role });

    if (result.success) {
      toast.success('Zaktualizowano dane użytkownika!');
      router.refresh();
    } else {
      toast.error('Wystąpił błąd przy aktualizacji.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Wybierz status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rola</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Wybierz rolę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Zapisz zmiany</Button>
      </form>
    </Form>
  );
};

export default UserStatusForm;
