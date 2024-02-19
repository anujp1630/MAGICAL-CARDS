
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages=[

  {"src":"/img/helmet-1.png" , matched:false},
  {"src":"/img/potion-1.png" , matched:false},
  {"src":"/img/ring-1.png" ,   matched: false},
  {"src":"/img/scroll-1.png" , matched:false},
  {"src":"/img/shield-1.png" , matched:false},
  {"src":"img/sword-1.png" ,   matched: false}

]

function App() {

  const[cards ,setCards]=useState([]);
  const[turns,setTurns]=useState(0);
  const[choiceOne,setChoiceOne]=useState(null);
  const[choiceTwo,setChoiceTwo]=useState(null);
  const[disabled ,setDisabled] = useState(false);


          // sufflecards
        const sufflecards =() =>{

            const suffledcards=[...cardImages, ...cardImages]
            .sort(()=> Math.random()-0.5)
            .map((card)=>({...card,id:Math.random()}))


            setChoiceOne(null)
            setChoiceTwo(null)
            setCards(suffledcards);
            setTurns(0);

        }

          // handle a choice

         const handleChoice = (card) =>{

          choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
         }



         //compare two selected cards

         useEffect( () => {

            

          if(choiceOne && choiceTwo) {

            setDisabled(true);

                if(choiceOne.src === choiceTwo.src){

                 setCards(prevCards => {

                      return prevCards.map(card =>{

                            if(card.src === choiceOne.src){

                              return{...card , matched:true}

                            } else{


                              return card
                            }



                      })


                 })
                  resetTurns()

                }   else{

                            
                         setTimeout ( () => resetTurns() , 1000)

                        }

          }

         } , [choiceOne , choiceTwo] )


            console.log(cards)

          // reset choices and increase turns
            
          const resetTurns = () => {

            setChoiceOne(null)
            setChoiceTwo(null)
            setTurns(prevTurns => prevTurns + 1)
            setDisabled(false)
          }

          // start the game automatically 

          useEffect( () => {

              sufflecards()
          },[])

  return (
    <div className="App">
      <h1> Magical Cards</h1>
      <button onClick={sufflecards}>New Game</button>
      <div className="card-grid">

          { cards.map(card=>(

            


            <SingleCard


                key={card.id} 
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched} 
                disabled={disabled}
                >
                
            </SingleCard>



          ) ) }





      </div>

            <p>Turns: { turns }</p>
    </div>
  );
}

export default App;