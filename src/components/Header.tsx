import type { Dispatch, SetStateAction } from 'react';

type Props = {
  page: 'home' | 'admin' | 'moderator';
  setPage: Dispatch<SetStateAction<'home' | 'admin' | 'moderator'>>;
};

export default function Header({ page, setPage }: Props) {
  return (
    <header className="bg-dark text-light py-3">
      <div className="container">
        <h1 className="h3 mb-3">Videójáték katalógus</h1>

        <nav>
          <button
            onClick={() => setPage('home')}
          >
            Kezdőlap
          </button>

          <button
           onClick={() => setPage('admin')}
          >
            Admin
          </button>

          <button
            onClick={() => setPage('moderator')}
          >
            Moderátor
          </button>
        </nav>
      </div>
    </header>
  );
}