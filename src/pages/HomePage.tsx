import type { Game } from '../types/Game';

type Props = {
  games: Game[];
};

export default function HomePage({ games }: Props) {
  return (
    <section>
      <h2 className="mb-3">Játékok listája</h2>

      <article className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Cím</th>
              <th>Műfaj</th>
              <th>Megjelenés</th>
              <th>Jóváhagyva</th>
            </tr>
          </thead>

          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.title}</td>
                <td>{game.genre}</td>
                <td>{game.releaseYear}</td>
                <td>
                  {game.isApproved ? (
                    <span className="badge bg-success">Jóváhagyva</span>
                  ) : (
                    <span className="badge bg-danger">Nincs jóváhagyva</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}