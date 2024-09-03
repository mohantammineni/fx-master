import React, { useEffect } from 'react';
import { BOTTOM_LINKS, EXTERNAL_NAVIGATION_LINKS } from '../../lib/const/navbar-links';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";

const linkClass =
    'flex items-center gap-2 py-3 px-4 hover:no-underline text-sm font-normal text-slate-900 mb-1';
const activeClass = 'bg-[#205FFF] rounded text-white';

export default function ExternalSidebar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const logout = async () => {
        sessionStorage.clear();
        navigate('/externalLogin')
    }
    const loadData = async () => {
    }
    useEffect(() => {
        loadData()
    })
    return (
        <div className="w-64 flex flex-col text-white py-3 mr-4 mt-6">
            <div className="flex-1 px-4">
                {EXTERNAL_NAVIGATION_LINKS.map((item) => (
                    <div key={item.key}>
                        {item.key == 'logout' ?
                            <button key={item.key} onClick={logout} className={
                                classNames(pathname === item.path ? activeClass : '', linkClass)
                            }>
                                <span className="text-xl">{item.icon}</span>
                                {item.label}
                            </button>
                            :
                            <>
                                <button key={item.key} onClick={() => navigate(item.path)} className={
                                    classNames(pathname === item.path ? activeClass : '', linkClass)
                                }>
                                    <span className="text-xl">{item.icon}</span>
                                    {item.label}
                                </button>
                            </>
                        }
                    </div>
                ))}
            </div>
            <div className="px-4">
                {BOTTOM_LINKS.map((item) => (
                    <div key={item.key}>
                        {item.key == 'logout' ?
                            <button key={item.key} onClick={logout} className={linkClass}>
                                <span className="text-xl">{item.icon}</span>
                                {item.label}
                            </button>
                            :
                            <button key={item.key} onClick={() => navigate(item.path)} className={linkClass}>
                                <span className="text-xl">{item.icon}</span>
                                {item.label}
                            </button>}
                    </div>
                ))}
            </div>
        </div>
    );
}