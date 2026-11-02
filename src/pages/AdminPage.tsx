import { useState } from 'react';
import type { Game } from '../types/Game';

type Props = {
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
};

const emptyForm = {
  title: '',
  genre: '',
  releaseYear: 2026,
  isApproved: false,
};

export default function AdminPage({ games, setGames }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingId === null) {
      const newGame: Game = {
        id: String(Date.now()),
        title: form.title,
        genre: form.genre,
        releaseYear: Number(form.releaseYear),
        isApproved: form.isApproved,
      };

      setGames((prev) => [...prev, newGame]);
    } else {
      setGames((prev) =>
        prev.map((game) =>
          game.id === editingId
            ? {
                ...game,
                title: form.title,
                genre: form.genre,
                releaseYear: Number(form.releaseYear),
                isApproved: form.isApproved,
              }
            : game
        )
      );
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(game: Game) {
    setEditingId(game.id);
    setForm({
      title: game.title,
      genre: game.genre,
      releaseYear: game.releaseYear,
      isApproved: game.isApproved,
    });
  }

  function deleteGame(id: string) {
    setGames((prev) => prev.filter((game) => game.id !== id));
  }

  return (
    <section>
      <h2 className="mb-3">Admin panel</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-3">
            <h3 className="h5">
              {editingId === null ? 'Új játék felvétele' : 'Játék módosítása'}
            </h3>

            <label className="form-label mt-2">Cím</label>
            <input
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label className="form-label mt-2">Műfaj</label>
            <input
              className="form-control"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              required
            />

            <label className="form-label mt-2">Megjelenés éve</label>
            <input
              className="form-control"
              type="number"
              name="releaseYear"
              value={form.releaseYear}
              onChange={handleChange}
              required
            />

            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="isApproved"
                checked={form.isApproved}
                onChange={handleChange}
                id="isApproved"
              />
              <label className="form-check-label" htmlFor="isApproved">
                Jóváhagyva
              </label>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              {editingId === null ? 'Hozzáadás' : 'Mentés'}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Mégse
              </button>
            )}
          </form>
        </div>

        <div className="col-md-8">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Cím</th>
                <th>Műfaj</th>
                <th>Év</th>
                <th>Jóváhagyva</th>
                <th>Műveletek</th>
              </tr>
            </thead>

            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td>{game.title}</td>
                  <td>{game.genre}</td>
                  <td>{game.releaseYear}</td>
                  <td>{game.isApproved ? 'Igen' : 'Nem'}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => startEdit(game)}
                    >
                      Módosítás
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteGame(game.id)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}