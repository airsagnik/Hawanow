import { FaHome } from "react-icons/fa";
import { FaCloudSunRain } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";




export const SideBarData = [
    {
        title:"Home",
        path:"/",
        icon : <FaHome />,
        cName : "nav-text"
    },
        {
        title:"Forecast",
        path:"/forecast",
        icon : <FaCloudSunRain />,
        cName : "nav-text"
    },
        {
        title:"Locations",
        path:"/location",
        icon : <FaMapLocationDot />,
        cName : "nav-text"
    },
        {
        title:"Analytics",
        path:"/analytics",
        icon : <IoMdAnalytics />,
        cName : "nav-text"
    },
        {
        title:"Settings",
        path:"/settings",
        icon : <IoIosSettings />,
        cName : "nav-text"
    },
]