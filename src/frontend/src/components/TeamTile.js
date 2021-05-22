import { React } from 'react';
import { Link } from 'react-router-dom';

import './TeamTile.scss';
import kings from  '../images/Kings_XI_Punjab_logo.png';
import csk from  '../images/csk.png';
import Delhi_Capitals from  '../images/Delhi_Capitals.jpg';
import Mumbai_Indians from '../images/Mumbai_Indians.jpg';
import sunrisers from '../images/sunrisers.jpg';
import Rajasthan_Royals from '../images/Rajasthan_Royals.png';
import Royal_Challengers from '../images/Royal_Challengers.jpg'
import pune_warriors from '../images/pune_warriors.jpg';
import super_giant_pune from '../images/super_giant_pune.jpg';
import KKR from '../images/KKR.jpg';
import GL from '../images/GL.jpg';
import DC from '../images/DC.jpeg';
import kochi from '../images/kochi.png';

const renderImage = (teamName) => {
    switch(teamName) {
      case 'Kings XI Punjab' : return <img src={kings} alt="kings" height={50} width={75} />;
      case 'Chennai Super Kings' : return <img src={csk} alt="csk" height={50} width={75} />;
      case 'Delhi Capitals' : return <img src={Delhi_Capitals} alt="capitals" height={75} width={100} />;
      case 'Mumbai Indians' : return <img src={Mumbai_Indians} alt="mumbai" height={75} width={100} />;
      case 'Sunrisers Hyderabad' : return <img src={sunrisers} alt="sunrisers" height={75} width={100} />;
      case 'Rajasthan Royals' : return <img src={Rajasthan_Royals} alt="Rajasthan_Royals" height={75} width={100} />;
      case 'Royal Challengers Bangalore' : return <img src={Royal_Challengers} alt="Royal_Challengers" height={75} width={100} />;
      case 'Pune Warriors' : return <img src={pune_warriors} alt="pune_warriors" height={75} width={100} />;
      case 'Rising Pune Supergiant': return <img src={super_giant_pune} alt="super_giant_pune" height={75} width={100} />;
      case 'Kolkata Knight Riders': return <img src={KKR} alt="KKR" height={75} width={100} />;
      case "Gujarat Lions": return <img src={kochi} alt="KKR" height={75} width={100} />;
      case "Kochi Tuskers Kerala": return <img src={GL} alt="KKR" height={75} width={100} />;
      case "Deccan Chargers": return <img src={DC} alt="KKR" height={75} width={100} />;
      case "Rising Pune Supergiants": return <img src={super_giant_pune} alt="super_gn" height={75} width={100} />;
      default : return null;
    }
   }  
export const TeamTile = ({teamName}) => {
    return (
        <div className="TeamTile">
            <h1>
                    <Link to={`/teams/${teamName}`}>
                        {teamName}
                    </Link>
            </h1>
            {renderImage(teamName)}
            
        </div>
        
    )
}