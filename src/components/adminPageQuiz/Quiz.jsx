
import { useState } from 'react'
import React from 'react'
import loadinImg from "../../images/Loading_icon.gif";
import { Clear } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";


import './quiz.scss'
export default function Quiz({item}) {
    const [loading, setloading] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [showMasege, setShowMasege] = useState(false)
    const server = `https://quiz-app-api-nine.vercel.app`;
  
    const handleDelete = (id) => {
        setDeleted(false);
        setloading(true);
        fetch(`${server}/quize/${id}`, {
          method: "delete",
        }).then((respo) => {
          if (respo.status == 200) {
            setDeleted(true);
            setShowMasege(true);
            setloading(false)
            
          } else {
            
          }
        });
      };
  
  
  return (
    <>
    <div className={ deleted ? "quiz dn" : "quiz"}>
        <div className="time">
            <span className="catagory">{item.catagory}</span>
            <span>{new Date(item.createdAt).toDateString()}</span>
            <Delete className="delete" onClick={()=>handleDelete(item._id)} />
        </div>
        <div className="question">
            <span>{item.question}</span>
        </div>
        <div className="options">
            <ul>
            {item.options.map((elm) => (
                <li className={elm.stutus == "correct" ? "disk" : ""}>
                {elm.option}
                </li>
            ))}
            </ul>
        </div>
    </div>
    {loading && (
        <div className="loading">
          <img src={loadinImg} alt="" />
        </div>
      )}
      {showMasege && <div className="dalateMassege">
        <span>
          Quiz Deleted Successfully
        </span>
        <Clear className='claer' onClick={()=>setShowMasege(false)}/>
        
        </div>}
    </>
    
    
  )
}
