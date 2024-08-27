import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar bg-black text-white rounded-full">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><NavLink to="/">Link</NavLink></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><NavLink to="/">Link 1</NavLink></li>
            <li className='py-1'><NavLink to="/">Link 2</NavLink></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
  )
}
