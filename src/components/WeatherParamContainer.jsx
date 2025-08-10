import classes from "./WeatherParamsContainer.module.css";

function WeatherParamContainer({title,option,child}) {
    return (
        <div className={classes.weatherParamHolder}>
            <div className={classes.optionHolder}>
            <p>{title}</p>
            <p>{option}</p>  
            </div>
            <div className={classes.weatherParam}>
                    {child}               
            </div>
        </div>


    );
}

export default WeatherParamContainer;