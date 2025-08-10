import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import classes from "./ProfileItem.module.css";


function ProfileItems() {
    return (
        <div className={classes.profilegroup}>
            <FaBell className={classes.profileimg} />
            <CgProfile className={classes.profileimg} />
            <div>
                <img className={classes.profileimg} src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile' />
            </div>
        </div>
    );
}

export default ProfileItems;