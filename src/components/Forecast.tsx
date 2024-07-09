import { roundTemperature } from '../lib/utils';
import moment from 'moment';
import { IoRainyOutline } from "react-icons/io5";

type ForecastProps = {
  forecast: any[]
};

const Forecast = ({ forecast }: ForecastProps) => {
  return (
    <div className="sc-forecast">
      <h4>5 Day Forecast</h4>
      <table>
       <colgroup>
          <col className="sc-forecast__day" />
          <col className="sc-forecast__precip" />
          <col className="sc-forecast__max-temp" />
          <col className="sc-forecast__min-temp" />
        </colgroup>
        <tbody>
          {forecast.map((item) => {
            return (
              <tr key={item.date}>
                <td><b>{moment(item.date).format("ddd")}</b></td>
                <td><IoRainyOutline /> {roundTemperature(item.precipitation)}%</td>
                <td>L: {roundTemperature(item.minTemp)}&deg;</td>
                <td>H: {roundTemperature(item.maxTemp)}&deg;</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Forecast