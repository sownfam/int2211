'use client'
import Link from 'next/link';

import NavLink from '@/components/header/nav-link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAuth } from '@/states/user';
import React from 'react';

const NAV_ITEMS = [
  { path: 'blog', name: 'Explore' },
  { path: 'create', name: 'Create Blog' },
  { path: 'login', name: 'Login' },
];

// TODO (low priority):
// 1. Disable Login when logged in
// 2. In Guest mode, Create Blog will lead to Login
export default function Header() {
  const [userInfo, setUserInfo] = useRecoilState(userAuth);
  React.useEffect(() => {
    if (window.localStorage.getItem("blog-username") != null && window.localStorage.getItem("blog-userID") != null) {
      const username = window.localStorage.getItem("blog-username") ?? "";
      const userID = window.localStorage.getItem("blog-userID") ?? "";
      setUserInfo({username, userID});
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem("blog-username");
    window.localStorage.removeItem("blog-userID");
    window.location.reload();
  }

  return (
    <nav className="flex flex-col justify-between py-12 md:flex-row">
      <Link href="/" className="self-start md:self-auto">
        <h1 className="text-3xl font-bold"> {userInfo.username ? `Welcome, ${userInfo.username}` : 'Guest'} </h1>
      </Link>
      <div className="my-6 flex space-x-8 self-center md:my-0 md:self-auto">
        <ul className="flex space-x-8">
          {NAV_ITEMS.map((item) => ((item.name !== 'Login' || userInfo.userID === "") ?
            <li
              key={item.path}
              className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300"
            >
              <NavLink path={item.path}>{item.name}</NavLink>
            </li>
          : (
            <li
              key={item.path}
              className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300"
            >
              <div>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </li>
          )))}
        </ul>
      </div>
    </nav>
  );
}
