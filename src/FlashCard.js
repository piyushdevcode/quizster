import React,{ useState, useEffect,useRef } from 'react'

export default function FlashCard({ flashcard }) {
    const [flip,setflip] = useState(false);
    const [height,setHeight] = useState('initial');
    const cardfront = useRef();
    const cardback = useRef();
    function calcMaxHeight() {
        const frontHeight = cardfront.current.getBoundingClientRect().height;
        const backHeight = cardback.current.getBoundingClientRect().height;

        setHeight(Math.max(frontHeight,backHeight,150));

    }
    // To recalculate height according to content
    useEffect(calcMaxHeight,[flashcard.question,flashcard.ans,flashcard.options])

    // To recalculate height when page resizes
    useEffect(() =>{
        window.addEventListener('resize',calcMaxHeight)
       return () =>window.removeEventListener('resize',calcMaxHeight); 
    },[])


    return (
        <div
        className={`card ${flip ? 'flip': ''}`}
        style ={{height:height}}
        onClick={()=> setflip(!flip)}>
            <div className='front' ref={cardfront}>
                {flashcard.question}
                <hr/>
                <div className='flashcard-options'>
                    {flashcard.options.map((option,index) =>{
                        return <div className='flashcard-option'>{index+1}. {option}</div>
                    })}
                </div>
            </div>
            <div className='back' ref={cardback}>
                {flashcard.ans}
            </div>
            </div>
    )
}
