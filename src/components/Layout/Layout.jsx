import { useMemo, useState } from "react"

import { SideBar } from "../Navbar/SideBar"
import "./layout.css"

import Main from "../Main/Main";

const Layout = ({children,slug,addSlug}) => {
  const [arrow,setArrow]=useState(false);

  return (
    <div className="layout-main">
        <SideBar setArrow={setArrow} arrow={arrow}/>
      
            <Main arrow={arrow} slug={slug} addSlug={addSlug}>
                
                {children}
            </Main>
    </div>
  )
}

export default Layout