import React from "react";

function Leaderboards(props) {

    const userPointData = [
		{
			firstName: 'Hobbit',
            lastName: 'Ton',
            points: 233,
		},
		{
			firstName: 'Wilburt',
            lastName: 'Wilfree',
            points: 589,
		},
		{
			firstName: 'Richman',
            lastName: 'Yard',
            points: 10023,
		},
		{
			firstName: 'Ronald',
            lastName: 'Weasley',
            points: 432,
		},
        {
			firstName: 'Wall',
            lastName: 'E',
            points: 153,
		},
		{
			firstName: 'Erik',
            lastName: 'Wallstreet',
            points: 865,
		},
		{
			firstName: 'Mlon',
            lastName: 'Eusk',
            points: 983,
		},
		{
			firstName: 'Bill',
            lastName: 'Jobs',
            points: 642,
		},
        {
			firstName: 'Queue',
            lastName: 'Meet',
            points: 213,
		},
		{
			firstName: 'Uni',
            lastName: 'Student',
            points: 123,
		},
		{
			firstName: 'Happy',
            lastName: 'Sadmore',
            points: 236,
		},
		{
			firstName: 'Alex',
            lastName: 'A',
            points: 513,
		},
		
	];

    const sortedUserData = userPointData.sort((a,b) => b.points-a.points);




    const addTable = (boiz) => {
		return boiz.slice(0,10).map((person) => (
            <tr>
                <td>{person.firstName}</td>
                <td>{person.points}</td>
            </tr>
            
		));
	};





    return (
        <div className="container">
            <h3 className= "text-center">Leaderboards</h3>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                        {addTable(sortedUserData)}
                        </tbody>
                    </table>
        </div>
	);
}

export default Leaderboards;