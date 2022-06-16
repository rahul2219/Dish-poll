import "./Dish.css";

import { useEffect, useState } from "react"

export function Dish(){
    const [dishes,setDishes] = useState([]);
    const [favourites,setFavourites] = useState([]);
    const[show,setShow] = useState(false);
    const[showRank,setShowRank] = useState(false);
    const[Dish,setDish] = useState('');
    const [changeRank,setChangeRank] = useState(false);
    const [changeDish,setChangeDish] = useState("");

    useEffect(()=>{
        fetchDishes();
    },[])

    const fetchDishes = async()=>{
        const url = `https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json`;
        const response = await fetch(url);
        if(response.status === 200){
            const data = await response.json();
            setDishes(data);
            console.log(data);
        }
    }

    const handleAddFavourites = (dish,rank)=>{
        
        if(favourites.length > 0){
            if(favourites[0] && favourites[0].id === dish.id){
                setShow(false);
                return;
            }
            if(favourites[1] && favourites[1].id === dish.id){
                setShow(false);
                return;
            }
            if(favourites[2] && favourites[2].id === dish.id){
                setShow(false);
                return;
            }
        }
        let newFavourites = favourites;
        newFavourites[rank-1]=dish;
        dish.rank=rank;
        setFavourites(newFavourites);
        setShow(false);
        setShowRank(false);
        console.log(favourites);
    }

    const handleAdding=(dish)=>{
        setShowRank(true);
        setDish(dish);
        if(show === true){
            setShow(false);
        }
    }

    const handleChangeRank = (favourite)=>{
        setChangeDish(favourite);
        setChangeRank(true);

    }
    const handleChangeDish = (dish,rank)=>{
        favourites[rank-1]=dish;
        delete favourites[dish.rank-1];
        dish.rank=rank;
        setChangeRank(false);
    }

    const handleRemove=(favourite)=>{
        const newFavourites=[];
        for(var i=0;i<favourites.length;i++){
            if(favourites[i] && favourites[i].dishName !== favourite){
                console.log(newFavourites.length+" before")
                newFavourites.push(favourites[i]);
                console.log(newFavourites.length+" later")
            }
        }
        setFavourites(newFavourites);

    }

    let url = "https://loremflickr.com/300/300/"
    return(
        <div>
            <h2 className="heading1">Dishes For you to Dine-in or Order!</h2>
            {show?
                <h2 className="heading2" onClick={()=>{setShow(!show)}}>HideFavourites</h2>:
                <h2 className="heading2" onClick={()=>{setShow(!show)}}>Click to Show Favourites</h2>}
            <div className="dishes-favourites">
                <div className="dishes">
                    {dishes.map((dish)=>(
                        <div className="dish">
                            <img src = {url+dish.dishName} alt=""/>
                            <div className="right-div">
                                <p className="name">{dish.dishName}</p>
                                <p>{dish.description}</p>
                            </div>
                            <div className="favourite-button"><button onClick={()=>handleAdding(dish)}>Add To Favourites</button>
                            {showRank && Dish === dish?
                            <div className="rank">
                                <b style={{color:"black"}}>Select Rank:</b>
                                <span onClick={()=>handleAddFavourites(dish,1)}>1 </span>
                                <span onClick={()=>handleAddFavourites(dish,2)}>2 </span>
                                <span onClick={()=>handleAddFavourites(dish,3)}>3</span>
                            </div>:null}</div>
                            
                        </div>
                    ))}
                </div>
                {show && favourites.length > 0?
                <div className="favourites">
                    {favourites.map((favourite)=>(
                        <div className="favourite-dish">
                                <div className="favourite-rank"><b>Rank {favourite.rank}.</b></div>
                                <div className="left-div">
                                    <img src = {url+favourite.dishName} alt=""/>
                                </div>
                                <div className="right-divF">
                                    <span>{favourite.dishName}</span>
                                    <div className="change-div">
                                        { !changeRank || changeDish !== favourite ? <button className="change-button" onClick={()=>handleChangeRank(favourite)}>Change Rank to:</button>
                                        :changeDish === favourite?
                                        <div className="change-rank">
                                            <span onClick={()=>handleChangeDish(favourite,1)}>1 </span>
                                            <span onClick={()=>handleChangeDish(favourite,2)}>2 </span>
                                            <span onClick={()=>handleChangeDish(favourite,3)}>3</span>
                                            <span><img className="close" src="https://cdn-icons-png.flaticon.com/128/1828/1828666.png" alt="close" onClick={()=>{setChangeRank(false)}}/></span>
                                        </div>:null}
                                    </div>
                                    <span className="remove" onClick={()=>handleRemove(favourite.dishName)}>Remove</span>
                                </div>
                        </div>
                    ))}
                </div>:show ?<div className="no-favourites-div"><p className="no-favourites">No Favourites Found!</p></div>:null}
            </div>
        </div>

    )
}