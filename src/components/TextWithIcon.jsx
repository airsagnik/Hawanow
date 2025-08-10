import classes from "./TextWithIcon.module.css";

function TextWithIcon({ icon, title }) {
    return (
        <div className={classes.textWithIconHolder}>
            {icon}
            <h2>{title}</h2>
        </div>
    );

}

export default TextWithIcon;