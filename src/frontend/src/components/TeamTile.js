import { React } from 'react';
import { Link } from 'react-router-dom';
import teamImages from './teamImages.json'
import './TeamTile.scss';

const getLogoAccordingToTeam = (team) =>{
    var teamNames = teamImages;
    var image = teamNames[team] ? teamNames[team] :"";
    return image;

}
const getImagePath =(teamName)=>{
   let img = getLogoAccordingToTeam(teamName);
  img= img.replace(/['"]+/g, "");
   return (
    <img  className="logoImg" src={`../images/${img}.png`} alt=""  />
  );
}

export const TeamTile = ({teamName}) => {



    return (
        <div className="TeamTile">
            <h1>
                    <Link to={`/teams/${teamName}`}>
                        {teamName}
						{getImagePath(teamName)}
                    </Link>
                </h1>
        </div>
    )
}