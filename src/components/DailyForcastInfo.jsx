import TextWithIcon from "./TextWithIcon";
import { FaArrowUp } from "react-icons/fa";
import classes from './DailyForcastInfo.module.css';

function DailyForcastInfo()
{
    return (
        <div className={classes.forcastHolder}>
        <div className={classes.highLowTemp}>
           <TextWithIcon icon={<FaArrowUp height="40px" width="40px" />} title={"26"}/>
           <TextWithIcon icon={<FaArrowUp height="40px" width="40px" />} title={"11"}/>
        </div>
        <div className={classes.weatherSummary}>
           <FaArrowUp height="40px" width="40px" />
           <div className={classes.dayWiseSummary}>
            <h3>Wednesday</h3>
            <h5>Rainy</h5>
           </div>
        </div>
        </div>
  
    );
}

export default DailyForcastInfo;