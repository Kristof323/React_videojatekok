import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ModeratorPage from './pages/ModeratorPage';
import { initialGames } from './data/game';
import type { Game } from './types/Game';

type Page = 'home' | 'admin' | 'moderator';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [games, setGames] = useState<Game[]>(initialGames);

  return (
    <>
      <Header page={page} setPage={setPage} />

      <main className="container my-4">
        {page === 'home' && <HomePage games={games} />}
        {page === 'admin' && <AdminPage games={games} setGames={setGames} />}
        {page === 'moderator' && (
          <ModeratorPage games={games} setGames={setGames} />
        )}
      </main>

      <Footer />
    </>
  );
}