import { IoOptionsOutline } from "react-icons/io5";
import classes from './ChanceOfRain.module.css';
import BarGraph from "./BarGraph";
function ChanceOfRain() {
    return (
        <div>
            <div className={classes.header}>
                <h2>Chances of Rain</h2>
                <IoOptionsOutline height={"50px"} width={"50px"} />
            </div>
            <div>
             <BarGraph/>
            </div>
        </div>
    );
}

export default ChanceOfRain;