import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';

import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

export const MatchPage = () => {


    const [matches, setMatches] = useState([]);
	
    const { teamName, year } = useParams();
	const [filteredMatch, setFilteredMatch]= useState([]);
	const [searchTerm,setSearchTerm]=useState("");
    const [filterTerm,setFilterTerm]=useState("");
    useEffect(
        () => {
         const fetchMatches = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
            const data = await response.json();
            setMatches(data);
			setFilteredMatch(data);

         };
         fetchMatches();
            


        }, [teamName, year]
    );

	const editFilterTerm =(event)=>{
        debugger;
        let filterTerm= event.target.value;
        setFilterTerm(filterTerm);
        let currentList= match;
       let filteredList=[];
        switch (filterTerm) {
            case "win":
              filteredList = currentList.filter(item =>
                item.matchWinner === teamName);
              break;
            case "loss":
                filteredList = currentList.filter(item =>
                    item.matchWinner !== teamName);
              break;
            case "bat":
                filteredList = currentList.filter(item =>
                    item.tossDecision === "bat");
              break;
            case "ball":
                filteredList = currentList.filter(item =>
                    item.tossDecision === "field");
              break;
            default:
              filteredList = currentList;
          }
          if (filteredList && filteredList.length > 0) {
            setFilteredMatch(filteredList);
          }
    }

    const editSearchTerm=(event)=>{
        let searchTerm= event.target.value;
        setSearchTerm(searchTerm);
        let currentList=match;
        let filteredList=[];
        filteredList = currentList.filter(
            (item) =>
              item.city.toLowerCase().includes(searchTerm.toLowerCase()) || //City
              item.playerOfMatch.toLowerCase().includes(searchTerm.toLowerCase()) || //player of match
              item.venue.toLowerCase().includes(searchTerm.toLowerCase()) || //venue
              item.umpire1.toLowerCase().includes(searchTerm.toLowerCase()) || //umpire1
              item.umpire2.toLowerCase().includes(searchTerm.toLowerCase())  //umpire2
            
          );
          if (filteredList && filteredList.length > 0) {
            setFilteredMatch(filteredList);
          }
    }

	
    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3> Select Year </h3>
                <YearSelector teamName={teamName} />
            </div>
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
				<select
                    onChange={editFilterTerm}
                    value={filterTerm}

                >
                    <option value="" selected>
                        Filter By
                    </option>
                    <option value="win">Wins</option>
                    <option value="loss">Losses</option>
                    <option value="bat">Bat First</option>
                    <option value="bowl">Bowl First</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={editSearchTerm}

                    placeholder="Search by keyword"
                />
                {
					filteredMatch && filteredMatch.length>0 ?
                    filteredMatch.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
					 :
                    <div className="col">
                        <p style={{"textAlign":"center","padding":"20%"}}>No matches found</p>
                    </div>
                }
            </div>

        </div>
    );
}