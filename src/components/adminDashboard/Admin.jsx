import React from "react";
import { useEffect, useState, useRef } from "react";
import Quiz from "../adminPageQuiz/Quiz";
import loadinImg from "./Loading_icon.gif";
import { Delete } from "@material-ui/icons";
import "./admin.scss";
import { Clear } from "@material-ui/icons";
export default function Admin() {
  const [loading, setloading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [data, setdata] = useState();
  const server = `https://quiz-app-api-nine.vercel.app`;
  const searchQuery = useRef();
  const [searchCatagory, setSearchCatagory] = useState("");

  const handleDelete = (id) => {
    setDeleted(false);
    setloading(true);
    fetch(`${server}/quize/${id}`, {
      method: "delete",
    }).then((respo) => {
      if (respo.status == 200) {
        setDeleted(true);
        setloading(false)
        
      } else {
        
      }
    });
  };

  const handleSearch = () => {
    if (searchCatagory) {
      const searchCatagoryData = allData.filter((item) => 
        item.question
          .toLocaleLowerCase()
          .includes(searchQuery.current.value.toLocaleLowerCase())
      );
      const searchData = searchCatagoryData.filter(
        (item) => item.catagory.toLocaleLowerCase() === searchCatagory.toLocaleLowerCase()
      );
      setdata(searchData)
    } else {
      const searchCatagoryData = allData.filter((item) => 
        item.question
          .toLocaleLowerCase()
          .includes(searchQuery.current.value.toLocaleLowerCase())
      );
      setdata(searchCatagoryData)
    }
  };
  useEffect(() => {
    fetch(`${server}/quize`)
      .then((res) => res.json())
      .then((resp) => {
        setAllData(resp);
        setdata(resp);
        setloading(false);
        
      });
  }, []);

  return (
    <div className="admin">
      {loading && (
        <div className="loading">
          <img src={loadinImg} alt="" />
        </div>
      )}
      {deleted && <div className="dalateMassege">
        <span>
          Quiz Deleted Successfully
        </span>
        <Clear className='claer' onClick={()=>setDeleted(false)}/>
        
        </div>}
      {!loading && (
        <div className="wrapper">
          <div className="top">
            <input type="search" ref={searchQuery} placeholder='write here' />
            <select
              name="catagory"
              id="catagory"
              onChange={(e) => {
                setSearchCatagory(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="HTML">HTML</option>
              <option value="HTML">CSS</option>
              <option value="HTML">Javascript</option>
              <option value="HTML">React</option>
              <option value="HTML">Express</option>
              
            </select>
            <div className="search" onClick={handleSearch}>
              Search
            </div>
          </div>
          <div className="bottom">
            {data.map((item) => (
              <Quiz item={item}/>
              
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
