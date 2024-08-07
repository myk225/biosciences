import './index.css'
import {NavLink} from 'react-router-dom'
const NavItem = ({details, onUpdateActiveId, isActive}) => {
    const {id, name, icon, toPath} = details
    const onClickActiveNav = () => {
        onUpdateActiveId(id)
    }
    return(
        <NavLink to={toPath} className='hospital-nav-Item' style={({isActive}) => ({backgroundColor: isActive ? '#e3e2e46f': '', color: isActive? '#dcdcdc': '', paddingLeft: isActive? '5px': ''})}>{icon}<li onClick={onClickActiveNav} className='nav-link-style'>{name}</li></NavLink>
    )
}

export default NavItem