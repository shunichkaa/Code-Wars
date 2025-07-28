// Following the trails of your lost master - Λoile - who you inherited your mad programming skills from,
// you have finally caught a lead and begin your adventure into the dungeon where progress can be made.
// To pass the first cave, you need to crack the code on the podium sitting in front of the gate, blocking you from moving onwards.
// Fortunately, you have access to the internet, make good use of it.
// To pass, implement the function in your language based on the code as given. Good luck!
// :345**/.87vv98,:<>
// v/*52:,+2*<>**-  |
// >6%.:52*%.1+:25*^@


function podiumCode() {
	return Array(12).fill().map((_,x)=>
		Array(6).fill().map((_,y)=>
			Array(10).fill().map((_,z)=>`${x}:${y}${z}
`).join``).join``).join``
}