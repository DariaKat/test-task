import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setArticle,
  searchManufacturers,
  searchAnalogues,
  selectArticle,
  selectSelectedBrand,
  selectLoadingManufacturers,
  selectLoadingAnalogues,
  selectErrorManufacturers,
  selectErrorAnalogues,
} from '@features/partsSearch';
import { ManufacturerList } from '@entities/manufacturer';
import { AnalogueTable } from '@entities/analogue';
import { Loader, ErrorMessage } from '@shared/ui';

export const PartsSearchPage = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const selectedBrand = useSelector(selectSelectedBrand);
  const loadingManufacturers = useSelector(selectLoadingManufacturers);
  const loadingAnalogues = useSelector(selectLoadingAnalogues);
  const errorManufacturers = useSelector(selectErrorManufacturers);
  const errorAnalogues = useSelector(selectErrorAnalogues);

  const [inputValue, setInputValue] = useState('');

  const handleSearchManufacturers = () => {
    if (!inputValue.trim()) return;
    dispatch(setArticle(inputValue.trim()));
    dispatch(searchManufacturers(inputValue.trim()));
  };

  const handleBrandSelect = (brand) => {
    if (!article) return;
    dispatch(searchAnalogues({ article, brand }));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🔍 Поиск автозапчастей и аналогов</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Шаг 1. Введите артикул</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Например, 0986479B05"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleSearchManufacturers()
              }
            />
            <button
              className="btn btn-primary"
              onClick={handleSearchManufacturers}
              disabled={loadingManufacturers}
            >
              {loadingManufacturers ? 'Поиск...' : 'Найти производителей'}
            </button>
          </div>
          {loadingManufacturers && <Loader />}
          {errorManufacturers && <ErrorMessage message={errorManufacturers} />}
          <ManufacturerList onSelectBrand={handleBrandSelect} />
        </div>
      </div>

      {selectedBrand && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Шаг 2. Аналоги для {selectedBrand} (артикул: {article})
            </h5>
            {loadingAnalogues && <Loader />}
            {errorAnalogues && <ErrorMessage message={errorAnalogues} />}
            <AnalogueTable />
          </div>
        </div>
      )}
    </div>
  );
};