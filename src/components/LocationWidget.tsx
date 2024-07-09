import { Location } from '../types/types';
import moment from 'moment';

type LocationWidgetProps = {
  location: Location | null,
};

const LocationWidget = ({ location }: LocationWidgetProps) => {
  const { name, country, latitude, longitude, elevation, timezone} = location || {};
  return (
    <section className="sc-location">
      <h4>Location</h4>
      <div className="sc-location__container">
        <div><b>Name:</b>&nbsp;&nbsp;{name}</div>
        <div><b>Country:</b>&nbsp;&nbsp;{country}</div>
        <div><b>Latitude:</b>&nbsp;&nbsp;{latitude}</div>
        <div><b>Longitude:</b>&nbsp;&nbsp;{longitude}</div>
        <div><b>Elevation:</b>&nbsp;&nbsp;{elevation}'</div>
        <div><b>Timezone:</b>&nbsp;&nbsp;{timezone}</div>
      </div>
    </section>
  )
}

export default LocationWidget