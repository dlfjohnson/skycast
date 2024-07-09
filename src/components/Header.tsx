import { Location } from '../types/types';
import Autocomplete from './AutoComplete';
import { SlLocationPin } from "react-icons/sl";

const Header = ({ data, setLocation }: {data: Location | null, setLocation: any}) => {
  const { name, admin1, country } = data || {};

  return (
    <header className="sc-header">
      <div className="sc-header__left-content">
        <h3><em>SkyCast</em></h3>
        {data &&
          <span className="sc-header__location">
            <SlLocationPin />
            <h6>{name}{admin1 ? `, ${admin1}` : ''}{country ? `, ${country}` : null}</h6>
          </span>
        }
      </div>
      <div className="sc-header__right-content">
        <Autocomplete setLocation={setLocation} />
      </div>
    </header>
  )
}

export default Header