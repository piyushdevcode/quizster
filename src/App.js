import React, { useState,useEffect,useRef } from "react";
import FlashCardList from "./FlashCardList";
import './App.css';
import axios from 'axios';
function App() {
  const [flashcards, setflashcards] = useState(QUESTIONS)
  const categoryEle = useRef();
  const questcountEle = useRef();
  const [categories,setcategeories] = useState([]);

  useEffect(()=>{
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res=>{
      setflashcards(res.data.results.map((questdetail,index) =>{
        const randomindex = Math.floor(Math.random() * 3)
        const options  = [...questdetail.incorrect_answers.map(opt => decoder(opt))];
        options.splice(randomindex,0,decoder(questdetail.correct_answer))
        return {
          id : `${index}-${Date.now()}`,
          question : decoder(questdetail.question),
          ans: questdetail.correct_answer,
          options: options,
        }
      }))
    })
    .catch(err=>{
      console.log(err);
    })

  },[])

  // TO get the all categories available 
  useEffect(()=>{
    axios.get('https://opentdb.com/api_category.php')
    .then(res=>{
      setcategeories(res.data.trivia_categories);
      console.log(categories);
    })
    .catch(err=>console.log(err));
  },[])

  function decoder(txt){
    const textArea = document.createElement('textarea');
    textArea.innerHTML = txt;
    return textArea.value;
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log("no of questions : ",questcountEle.value);
    console.log("Category selected: ",categoryEle.current.value);
    console.log("Category selected: ",categoryEle.current);
    
  }
  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="question-count">No of questions</label>
      <input type="number" id="ques-count" min={1} max={50} step="1" defaultValue={8}
      ref={questcountEle}/>
    </div>
    <div className="form-group">
      <label htmlFor="category">Category</label>
      <select id="category" ref={categoryEle}>
      {categories.map(cat=>{
        return <option value={cat.id} key={cat.id}>{cat.name}</option>
      })}
      </select>
    </div>
    <div className="form-group">
      <button className="btn">Magic !</button>
    </div>
    </form>
    <div className="container">
      <FlashCardList flashcards={flashcards}/>
    </div>
    </>
  );
}

export default App;

const QUESTIONS =[
{
  id: 1,
  question: 'What is your Name ?',
  ans: 'Vs Code',
  options: [
    '1',
    '2',
    '3',
    '4',
  ],
},
{
  id: 2,
  question: 'What is your age ?',
  ans: '5',
  options: [
    '10',
    '20',
    '5',
    '9',
  ],
}
]