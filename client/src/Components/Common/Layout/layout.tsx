import { NavLink } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import "./layout.css";
type title = {
    title : String //We have already header comoponent!
}
function Layout(props : title){
    return(
        <>
            <div className="sidebar">
                <h3 style={{marginLeft : 60}}>Talentelgia</h3>
                <div className="pages">
                <ul>
                    <li>
                        <NavLink  to="/admin/dashboard" >Dashboard</NavLink> 
                    </li>
                    <li>
                      <NavLink  to="/admin/aboutus" >About Us</NavLink>
                    </li>
                    <li>
                        Join Us
                    </li>
                    <li>
                        Our Team
                    </li>
                    <li>
                    Clients
                    </li>
                    <li>
                    Our Mission
                    </li>
                    <li>
                    Our Process
                    </li>
                    <li>
                    Real Estate
                    </li>
                </ul>
                </div>
            </div>
            <div className="bodyDiv">
                <div className="headerDiv">
                <ChevronLeftIcon style={{fontSize : 32}}/> &nbsp;
                  {props.title}
                </div>
            </div>
        </>
    )

}
export default Layout;