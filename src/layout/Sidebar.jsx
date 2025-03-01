import { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearAuth} from "../slices/authSlice.js";
import {Cookies} from "react-cookie";
import CommonModal from "../common/CommonModal.jsx";

function Sidebar() {
    const [sidebarOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const cookies = new Cookies();

    console.log(auth.admno)

    const menuItems = [
        {
            name: "Dashboard",
            path: "/graph",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        },
        {
            name: "제품 관리",
            path: "/product",
            icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m0-10L4 17m16 0l-8 4", // SVG 경로
            hasDropdown: true,
            subItems: [
                // { name: "리스트", path: "/product/list" },
                // { name: "알러지 기준 리스트", path: "/product/allergy-list" },
                { name: "제품명 검색", path: "/product/search" },
                { name: "알러지 기준 검색", path: "/product/allergy-search" },
                { name: "제품 등록", path: "/product/add" },
                { name: "환율", path: "/exchange-rate/list" }
            ]
        },
        {
            name: "리뷰 관리",
            path: "/review",
            icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
            hasDropdown: true,
            subItems: [
                { name: "리스트", path: "/review/list" }
            ]
        },
        {
            name: "사용자",
            path: "/user",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
            hasDropdown: true,
            subItems: [
                { name: "리스트", path: "/user/list" },
            ]
        },
        {
            name: "관리자",
            path: "/admin",
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
            hasDropdown: true,
            subItems: [
                { name: "리스트", path: "/admin/list" },
                { name: "QNA 답변 현황 리스트", path: "/admin/worklist" },
                { name: "등록", path: "/admin/reg" }
            ]
        },
        {
            name: "커뮤니티(신고)",
            path: "/request",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
            hasDropdown: true,
            subItems: [
                { name: "상품 신고 리스트", path: "/request/product/list" },
                { name: "알러지 신고 리스트", path: "/request/allergy/list" },
            ]
        },
        {
            name: "QNA",
            path: "/qna",
            icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z",
            hasDropdown: true,
            subItems: [
                { name: "리스트", path: "/qna/list" },
            ]
        },
        {
            name: "FAQ",
            path: "/faq",
            icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
            hasDropdown: true,
            subItems: [
                { name: "리스트", path: "/faq/list" },
                { name: "등록", path: "/faq/reg"}
            ]
        }
    ];

    const handleDropdownToggle = (menuName) => {
        setActiveDropdown(prevState => (prevState === menuName ? null : menuName));
    };

    const logoutFn = () => {

        dispatch(clearAuth());
    }

    const handleLogout = () => {

        setModalOpen(true);
    }

    useEffect(() => {
        const activeItem = menuItems.find(item => {
            if (item.hasDropdown) {
                return location.pathname.startsWith(item.path);
            }
            return location.pathname === item.path;
        });

        if (activeItem && activeItem.hasDropdown) {
            setActiveDropdown(activeItem.name);
        } else {
            setActiveDropdown(null);
        }
    }, [location.pathname]);

    return (
        <>
            {modalOpen && <CommonModal
                isOpen={modalOpen}
                msg={"로그아웃"}
                fn={logoutFn}
                closeModal={() => {
                    setModalOpen(false)
                    navigate('/');
                }}
                cancelFn={() => setModalOpen(false)}>
            </CommonModal>}

            <div>
                <aside
                    className={`z-20 ${sidebarOpen ? 'block' : 'hidden'} w-64 h-screen overflow-y-auto bg-white md:block flex-shrink-0`}>
                    <div className="py-4 text-gray-500">
                        <Link className="ml-6 text-lg font-bold text-gray-800 flex items-center" to="/graph">
                            {/*<img src="/eSnack24_logo_full.png" alt="Logo Image" className="mr-2 h-8"/>*/}
                            <img src="/eSnack24Logo2.png" alt="Logo Image" className="mr-2 h-8"/>
                        </Link>
                        <ul className="mt-6">
                            {menuItems.map((item, index) => (
                                <li key={index} className="relative px-6 py-4">
                                    {location.pathname === item.path && (
                                        <span
                                            className="absolute inset-y-0 left-0 w-1 bg-[#F9BB00] rounded-tr-lg rounded-br-lg"
                                            aria-hidden="true"></span>
                                    )}
                                    <div
                                        onClick={() => item.hasDropdown ? handleDropdownToggle(item.name) : null}
                                        className="cursor-pointer"
                                    >
                                        {item.hasDropdown ? (
                                            <span
                                                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${activeDropdown === item.name ? 'text-[#F9BB00]' : 'text-gray-800 hover:text-[#F9BB00]'}`}>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="none"
                                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path d={item.icon}></path>
                                            </svg>
                                            <span className="ml-4">{item.name}</span>
                                            <svg
                                                className={`ml-auto w-4 h-4 transition-transform transform ${activeDropdown === item.name ? 'rotate-180' : 'rotate-0'}`}
                                                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"/>
                                            </svg>
                                        </span>
                                        ) : (
                                            <Link
                                                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${location.pathname === item.path ? 'text-[#F9BB00]' : 'text-gray-800 hover:text-[#F9BB00]'}`}
                                                to={item.path}
                                            >
                                                <svg className="w-5 h-5" aria-hidden="true" fill="none"
                                                     strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d={item.icon}></path>
                                                </svg>
                                                <span className="ml-4">{item.name}</span>
                                            </Link>
                                        )}
                                    </div>
                                    {item.hasDropdown && (
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.name ? 'max-h-40' : 'max-h-0'}`}>
                                            <ul className="pl-10 mt-2 space-y-2">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            to={subItem.path}
                                                            className={`text-gray-700 hover:text-[#F9BB00] ${location.pathname === subItem.path ? 'text-[#F9BB00] font-semibold' : ''}`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* 로그아웃 버튼 */}
                        <div className="absolute bottom-4 left-6 px-6">
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center text-sm font-semibold text-red-600 hover:text-red-800 py-2 px-4 rounded-md mt-2 bg-white border border-transparent hover:border-red-600 transition-colors duration-150"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17 16l4-4m0 0l-4-4m4 4H3" />
                                </svg>
                                로그아웃
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Sidebar;