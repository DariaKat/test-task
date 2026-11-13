import { useDispatch, useSelector } from 'react-redux';
import {
  selectManufacturers,
  selectSelectedBrand,
  selectBrand,
} from '@features/partsSearch';

export const ManufacturerList = ({ onSelectBrand }) => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(selectManufacturers);
  const selectedBrand = useSelector(selectSelectedBrand);

  if (manufacturers.length === 0) return null;

  const handleClick = (brand) => {
    dispatch(selectBrand(brand));
    if (onSelectBrand) onSelectBrand(brand);
  };

  return (
    <div className="mt-3">
      <h5>Выберите производителя:</h5>
      <div className="list-group">
        {manufacturers.map((brand) => (
          <button
            key={brand}
            type="button"
            className={`list-group-item list-group-item-action ${
              selectedBrand === brand ? 'active' : ''
            }`}
            onClick={() => handleClick(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};