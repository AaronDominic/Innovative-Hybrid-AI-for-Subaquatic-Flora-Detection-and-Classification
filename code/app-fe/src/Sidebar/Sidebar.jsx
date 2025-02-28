import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiAlgae } from "react-icons/gi";
import { VscRunAll } from "react-icons/vsc";
import { IoStatsChart, IoPersonCircleSharp, IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';

function Sidebar({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="top-0 sticky left-0 h-screen w-28 flex flex-col drop-shadow-xl shadow-md shadow-black bg-teal-900 text-lime-300">
            <SideBarIcon icon={<GiAlgae size="36" />} text="Home" route='/' />
            <SideBarIcon icon={<VscRunAll size="36" />} text="Launch" route='/launch' />
            <SideBarIcon icon={<IoStatsChart size="36" />} text="Statistics" route='/statistic' />
            <SideBarIcon icon={<IoPersonCircleSharp size="36" />} text="Profile" route='/profile' />
            <div className="mt-auto mb-4">
                <SideBarIcon icon={<IoLogOutOutline size="36" />} text="Logout" onClick={handleLogout} />
            </div>
        </div>
    );
}

const SideBarIcon = ({ icon, text, route, onClick }) => {
    
    const [isSmall, setIsSmall] = useState(false)
    function handleSidebarMouseOver(){
        setIsSmall(true)
        console.log(isSmall)
    }
    function handleSidebarMouseOut(){
        setIsSmall(false)
    }
    return (
    
        <>
        <div className="sidebar-icon group relative" onClick={onClick} onMouseOver={handleSidebarMouseOver} onMouseOut={handleSidebarMouseOut}>
            {route ? <Link to={route}>{icon}</Link> : icon}

            {isSmall?(<div className="smallText absolute left-20 top-1/2 transform -translate-y-1/2 bg-slate-400 text-black shadow-sm p-2 rounded-full z-20 opacity-75">
                    {text}
                </div>):<></>}
            
        </div>
        
        </>
    )
};

export default Sidebar;