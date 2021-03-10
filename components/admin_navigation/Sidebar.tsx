import React, { useEffect, useState } from "react";
import { NavigationItems } from "./NavigationItems";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Content from './Content'
import Header from './Header'
import { isMobile } from "../../utils";

export const Sidebar = (props) => {

  return (
    <div>
      <nav
        style={{ backgroundColor: '#1b5a90' }}
        className={
          `flex flex-col fixed top-20 bottom-0 overflow-y-auto flex-no-wrap overflow-hidden shadow-inner items-center justify-between z-10 pt-4 pb-2 -left-0
          ${props.collapsed ? 'w-56 px-6 sm:w-20 sm:px-4' : 'w-56 px-6'}
          ${props.collapsed && props._isMobile && 'hidden'}`
        }>
        <div className="flex-col items-stretch flex-no-wrap px-0 flex flex-wrap w-full mx-auto space-y-2">
          <div className='space-y-3'>
            <NavigationItems {...props} collapsed={props.collapsed} isMobile={props._isMobile} />
          </div>
        </div>
      </nav>
    </div>
  );
}