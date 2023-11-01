'use client'
import Link from 'next/link';

import NavLink from '@/components/header/nav-link';
import { useRecoilValue } from 'recoil';
import { userAuth } from '@/states/user';

const NAV_ITEMS = [
  { path: 'blog', name: 'Explore' },
  { path: 'create', name: 'Create Blog' },
  { path: 'login', name: 'Login' },
];

export default function Header() {
  const { username } = useRecoilValue(userAuth);
  return (
    <nav className="flex flex-col justify-between py-12 md:flex-row">
      <Link href="/" className="self-start md:self-auto">
        <h1 className="text-3xl font-bold"> {username ? `Welcome, ${username}` : 'Guest'} </h1>
      </Link>
      <div className="my-6 flex space-x-8 self-center md:my-0 md:self-auto">
        <ul className="flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.path}
              className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300"
            >
              <NavLink path={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
