import { useSelector } from 'react-redux';
import { selectAnalogues } from '@features/partsSearch';

export const AnalogueTable = () => {
  const analogues = useSelector(selectAnalogues);

  if (analogues.length === 0) return null;

  return (
    <div className="mt-4">
      <h5>Найденные аналоги и предложения:</h5>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Производитель / Название</th>
              <th>Цена</th>
              <th>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {analogues.map((item) => {
              const price =
                item.warehouses && item.warehouses.length > 0
                  ? Math.min(...item.warehouses.map((w) => w.price))
                  : null;
              return (
                <tr key={item.goodsID}>
                  <td>
                    <strong>{item.brand}</strong>
                    <br />
                    <small className="text-muted">{item.name}</small>
                  </td>
                  <td>{price !== null ? `${price} ₽` : '—'}</td>
                  <td>{item.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};