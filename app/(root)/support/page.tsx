'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import SuportMessageAction from '@/lib/actions/SupportMessage';

const SupportForm = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert('Nie znaleziono ID użytkownika. Zaloguj się ponownie.');
      return;
    }

    setLoading(true);
    try {
      const id = await SuportMessageAction({ userId, nickname, message });
      alert(`Wiadomość wysłana! ID: ${id}`);
      setNickname('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Błąd przy wysyłaniu wiadomości');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Masz problem lub pytanie?</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="nickname" className="mb-1 font-semibold">Nick na Vinted</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Twój nick"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 font-semibold">Twój problem / pytanie</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Opisz swój problem"
            rows={5}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
          {loading ? 'Wysyłanie...' : 'Wyślij'}
        </Button>
      </form>
    </section>
  );
};

export default SupportForm;
