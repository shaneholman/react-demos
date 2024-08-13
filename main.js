//**** UseEFFECT API CALL  */
const { useState, useEffect } = React;

const nbaTeams = [
  { name: "Los Angeles Lakers", statnumber: 1, division: "Pacific" },
  { name: "Chicago Bulls", statnumber: 3, division: "Central" },
  { name: "Miami Heat", statnumber: 2, division: "Southeast" },
  { name: "Dallas Mavericks", statnumber: 4, division: "Southwest" },
];

const teamAPI = {
  list() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(nbaTeams);
      }, 1000);
    });
  },
};

// Define the App component here
function App() {
  return <TeamList/>;
}

function TeamList() {
  const [busy, setBusy] = useState(false);
  const [teams, setTeams] = useState([]);

  async function loadTeams() {
    let data = await teamAPI.list();
    setTeams(data);
    setBusy(true);
    setBusy(false);
  }

  useEffect(function () {
    loadTeams();
  }, []);

  return (
    <div>
      <header>
        <h1>Teams</h1>
      </header>
      <div className="">
        {nbaTeams.map((team) => (
          <div className="card">
            <strong>Team: {team.name}</strong>
            <div> Division: {team.division}</div>
            <small>Personal Rank: {team.statnumber}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const { useState } = React;

// function FruitListItem(props) {
//   return (
//     <li>
//       {props.fruit.name} | <button onClick= {() => props.onRemove(props.fruit)} >Delete </button>
//     </li>
//   );
// }

// function FruitList() {
//   const [fruits, setFruits] = useState([
//     { id: 1, name: "apple" },
//     { id: 2, name: "orange" },
//     { id: 3, name: "blueberry" },
//     { id: 4, name: "banana" },
//     { id: 5, name: "kiwi" },
//     { id: 6, name: "grape" },
//     { id: 7, name: "pineapple" },
//     { id: 12, name: "strawberry" },

//   ]);
//     const removeFruit =(fruitRemoved) =>{

//       const updatedFruits = fruits.filter((fruit) => fruit.id !== fruitRemoved.id);
//       setFruits(updatedFruits);

//     };

//   return (
//     <ul>
//       {fruits.map((fruit) => (
//         <FruitListItem key={fruit.id} fruit={fruit} onRemove={removeFruit} />
//       ))}
//     </ul>
//   );
// }

// function App() {
//   return <FruitList />;
// }

// function removeFruit(){

// }

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// function App(){
//   const [user, setUser] = React.useState (null);
//   // const [user, setUser] = React.useState({first: "James", last: "Roday"});
//   return (
//     <div>
//       <AccountHeader user={user}/>
//     </div>
//   );
// }

//   function AccountHeader({user}){
//     return (
//       <div>
//         {user ? (<span> {user.first} {user.last}</span>)
//         :<a href=""> Sign In </a>}
//       </div>
//     )
//   };
//   ReactDOM.createRoot(document.getElementById('root')).render(<App />);

//NEED TO FINISH *****
// const movies = [
//   {
//     imdbID: "tt10872600",
//     title: "Spider-Man: No Way Home",
//     year: 2021,
//     director: "Jon Watts",
//     genre: "Action",
//     rating: 8.4,
//     budgetInMillions: 200,
//   },
//   {
//     imdbID: "tt1160419",
//     title: "Dune",
//     year: 2021,
//     director: "Denis Villeneuve",
//     genre: "Sci-Fi",
//     rating: 8.1,
//     budgetInMillions: 165,
//   },
//   {
//     imdbID: "tt1877830",
//     title: "The Batman",
//     year: 2022,
//     director: "Matt Reeves",
//     genre: "Action",
//     rating: 8.3,
//     budgetInMillions: 185,
//   },
//   {
//     imdbID: "tt2382320",
//     title: "No Time to Die",
//     year: 2021,
//     director: "Cary Joji Fukunaga",
//     genre: "Action",
//     rating: 7.3,
//     budgetInMillions: 250,
//   },
//   {
//     imdbID: "tt10838180",
//     title: "The Matrix Resurrections",
//     year: 2021,
//     director: "Lana Wachowski",
//     genre: "Sci-Fi",
//     rating: 5.7,
//     budgetInMillions: 190,
//   },
//   {
//     imdbID: "tt9376612",
//     title: "Shang-Chi and the Legend of the Ten Rings",
//     year: 2021,
//     director: "Destin Daniel Cretton",
//     genre: "Action",
//     rating: 7.4,
//     budgetInMillions: 150,
//   },
//   {
//     imdbID: "tt2953050",
//     title: "Encanto",
//     year: 2021,
//     director: "Byron Howard, Jared Bush",
//     genre: "Animation",
//     rating: 7.9,
//     budgetInMillions: 120,
//   },
//   {
//     imdbID: "tt8847712",
//     title: "The French Dispatch",
//     year: 2021,
//     director: "Wes Anderson",
//     genre: "Comedy",
//     rating: 7.2,
//     budgetInMillions: 25,
//   },
//   {
//     imdbID: "tt11286314",
//     title: "Don't Look Up",
//     year: 2021,
//     director: "Adam McKay",
//     genre: "Comedy",
//     rating: 7.2,
//     budgetInMillions: 75,
//   },
//   {
//     imdbID: "tt6334354",
//     title: "The Suicide Squad",
//     year: 2021,
//     director: "James Gunn",
//     genre: "Action",
//     rating: 7.2,
//     budgetInMillions: 185,
//   },
//   {
//     imdbID: "tt6264654",
//     title: "Free Guy",
//     year: 2021,
//     director: "Shawn Levy",
//     genre: "Comedy",
//     rating: 7.1,
//     budgetInMillions: 100,
//   },
//   {
//     imdbID: "tt3228774",
//     title: "Cruella",
//     year: 2021,
//     director: "Craig Gillespie",
//     genre: "Comedy",
//     rating: 7.4,
//     budgetInMillions: 100,
//   },
//   {
//     imdbID: "tt9032400",
//     title: "Eternals",
//     year: 2021,
//     director: "Chloé Zhao",
//     genre: "Action",
//     rating: 6.4,
//     budgetInMillions: 200,
//   },
//   {
//     imdbID: "tt8332922",
//     title: "A Quiet Place Part II",
//     year: 2021,
//     director: "John Krasinski",
//     genre: "Horror",
//     rating: 7.3,
//     budgetInMillions: 61,
//   },
//   {
//     imdbID: "tt3480822",
//     title: "Black Widow",
//     year: 2021,
//     director: "Cate Shortland",
//     genre: "Action",
//     rating: 6.7,
//     budgetInMillions: 200,
//   },
//   {
//     imdbID: "tt0870154",
//     title: "Jungle Cruise",
//     year: 2021,
//     director: "Jaume Collet-Serra",
//     genre: "Adventure",
//     rating: 6.6,
//     budgetInMillions: 200,
//   },
//   {
//     imdbID: "tt4513678",
//     title: "Ghostbusters: Afterlife",
//     year: 2021,
//     director: "Jason Reitman",
//     genre: "Comedy",
//     rating: 7.1,
//     budgetInMillions: 75,
//   },
//   {
//     imdbID: "tt12801262",
//     title: "Luca",
//     year: 2021,
//     director: "Enrico Casarosa",
//     genre: "Animation",
//     rating: 7.5,
//     budgetInMillions: 50,
//   },
//   {
//     imdbID: "tt1321510",
//     title: "In the Heights",
//     year: 2021,
//     director: "Jon M. Chu",
//     genre: "Drama",
//     rating: 7.3,
//     budgetInMillions: 55,
//   },
//   {
//     imdbID: "tt11214590",
//     title: "House of Gucci",
//     year: 2021,
//     director: "Ridley Scott",
//     genre: "Drama",
//     rating: 6.6,
//     budgetInMillions: 75,
//   },
// ];

// function App() {
//   return <MoviesPage />;
// }

// function MoviesPage() {
//   const [movies, setMovies] = React.useState([]);

//   const handleClick = () => {
//     setMovies([movies]);
//   };

//   return (
//     <div>
//       <h1>MOVIES</h1>
//       <button onClick={handleClick}>Movie List</button>
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const { useState } = React;

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   function loadData() {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setData([1, 2, 3, 4]);
//     }, 3000);
//   }

//   return (
//     <>
//       {loading && <p>Loading...</p>}
//       <pre>{JSON.stringify(data, null, ' ')}</pre>
//       <button onClick={loadData}>Load Data</button>
//     </>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

////********************** */
// function App() {
//   return <Parent />;
// }

// function Parent() {
//   const [words, setWords] = React.useState('');

//   const handleClick = () => {
//     setWords('Did you do your homework?');
//   };

//   return (
//     <div>
//       <h1>Parent</h1>
//       <button onClick={handleClick}>Ask</button>
//       <Child hears={words} />
//     </div>
//   );
// }

// function Child(props) {
//   return (
//     <div>
//       <h2>Child</h2>
//       <p>{props.hears}</p>
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// function DropdownMenu() {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const handleClick = () => {
//     setIsOpen((currentIsOpen) => !currentIsOpen);
//   };

// Turnary**
//   return (
//     <div>
//       <button onClick={handleClick}>Actions</button>
//       {isOpen ? (
//               <ul>
//                 <li>Edit</li>
//                 <li>Remove</li>
//                 <li>Archive</li>
//               </ul>
//             ) : null}
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);

// && OPERATOR
// return (
//   <div>
//     <button onClick={handleClick}>Actions</button>
//     {isOpen && (
//             <ul>
//               <li>thing1</li>
//               <li>thing2</li>
//               <li>thing3</li>
//             </ul>
//           )}
//   </div>
// );
// }
// ReactDOM.createRoot(document.getElementById('root')).render(<DropdownMenu />);

//if*****
// function DropdownMenu() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const handleClick = () => {
//     setIsOpen((currentIsOpen) => !currentIsOpen);
//   };

//   let menu;
//   if (isOpen) {
//     menu = (
//       <ul>
//         <li>Edit</li>
//         <li>Remove</li>
//         <li>Archive</li>
//       </ul>
//     );
//   }
//   return (
//     <div>
//       <button onClick={handleClick}>Actions</button>
//       {menu}
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<DropdownMenu />);

// function App() {
//   const [message, setMessage] = React.useState("");
//   return (
//     <div>
//       <p>
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam nobis necessitatibus sequi aperiam unde
//         accusamus{" "}
//       </p>
//       <button onClick={display}>Display</button>
//       <button onClick={DisplayMessage}>Display Message</button>
//       <p>{message}</p>
//     </div>
//   );
//   function DisplayMessage() {
//     setMessage("Message in a bottle");
//   }
// }
// function display() {
//   alert("Boo");
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// function Greeter({first, last, age}) {
//   return <h1>Hello, {first} {last} {age}  </h1>;
// }
// ReactDOM.createRoot(document.getElementById('root')).render(<Greeter first= "Snoop" last= "Dogg" age="Age: 52" />);

// function addMinutes(date, minutes) {
//   //we multiply minutes by 60000 is to convert minutes to milliseconds
//   return new Date(date.getTime() + minutes * 60000);
// }

// function Clock() {
//   const [time, setTime] = React.useState(new Date());

//   const handleClick = () => {
//     setTime(addMinutes(time, 10));
//   };

//   return (
//     <div>
//       <p>{time.toLocaleTimeString()}</p>
//       <button onClick={handleClick}>+ 10 Minutes</button>
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);

// // let fn = function (){
// //   onClick()
// // };

// // let afn = ()=> onClick();

// function FruitListItem(props) {
//   function handleClick(id) {
//     console.log(`removed ${id}`);
//   }

//   return <li onClick={()=> handleClick(props.fruit.id)}>{props.fruit.name} </li>;

// }

// function FruitList(props) {
//   const fruitListItems = props.fruits.map((fruit) => (
//     <FruitListItem key={fruit.id} fruit={fruit} />
//   ));
//   return <ul>{fruitListItems}</ul>;
// }

// const data = [
//   { id: 1, name: 'apple' },
//   { id: 2, name: 'orange' },
//   { id: 3, name: 'blueberry' },
//   { id: 4, name: 'banana' },
//   { id: 5, name: 'kiwi' },
// ];

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <FruitList fruits={data} />
// );

// // function handleClick() {
// //   console.log("clicked");
// // }
// // function App() {
// //   return <button onClick={handleClick}>Click Me!</button>;
// // }

// // ReactDOM.createRoot(document.getElementById("root")).render(<App />);
