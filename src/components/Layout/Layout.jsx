import { useMemo, useState } from "react"

import { SideBar } from "../Navbar/SideBar"
import "./layout.css"

import Main from "../Main/Main";

const Layout = ({children,slug,addSlug,title,userManager}) => {
  const defaultVal=localStorage.getItem("sidebar") ?? "false";
  const [arrow,setArrow]=useState(defaultVal);

  return (
    <div className="layout-main">
        <SideBar setArrow={setArrow} arrow={arrow}/>
      
            <Main arrow={arrow} slug={slug} userManager={userManager} addSlug={addSlug} title={title}>
                
                {children}
            </Main>
    </div>
  )
}

export default Layout