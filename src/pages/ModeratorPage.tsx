import type { Game } from '../types/Game';

type Props = {
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
};

export default function ModeratorPage({ games, setGames }: Props) {
  function toggleApproved(id: string) {
    setGames((prev) =>
      prev.map((game) =>
        game.id === id
          ? { ...game, isApproved: !game.isApproved }
          : game
      )
    );
  }

  return (
    <section>
      <h2 className="mb-3">Moderátori felület</h2>

      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Cím</th>
            <th>Műfaj</th>
            <th>Állapot</th>
            <th>Művelet</th>
          </tr>
        </thead>

        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.genre}</td>

              <td>
                {game.isApproved ? (
                  <span className="badge bg-success">Jóváhagyva</span>
                ) : (
                  <span className="badge bg-secondary">Függőben</span>
                )}
              </td>

              <td>
                <button
                  className={`btn btn-sm ${
                    game.isApproved ? 'btn-outline-danger' : 'btn-outline-success'
                  }`}
                  onClick={() => toggleApproved(game.id)}
                >
                  {game.isApproved ? 'Visszavonás' : 'Jóváhagyás'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}