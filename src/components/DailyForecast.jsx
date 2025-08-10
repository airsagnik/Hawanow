import TextWithIcon from "./TextWithIcon";
import { FiSunrise } from "react-icons/fi";
import DailyForcastInfo from "./DailyForcastInfo";
function DailyForcast() {
    return (
        <div>
          <h3>3 Days Forecast</h3>
          <DailyForcastInfo/>
          <br />
          <DailyForcastInfo/>
          <br />
          <DailyForcastInfo/>
        </div>
    );
}

export default DailyForcast;