import React, { Fragment } from "react";
import style from './home.module.css'
import Hero from "./hero"
import Hero2 from "./hero2";
import Hero3 from "./hero3";
import HeroCategory from "./heroCategory";
import MiniItemPage from "../Item/miniItemPage";
import AllItem from "../Item/allItem";
const Home=()=>{
    return(
        <div className={style.home}>
            {/* <Hero2 className={style._hero}></Hero2> */}
            <br></br>
            <br></br>
            <div className={style.container}>
            <HeroCategory className={style._hero}></HeroCategory>
            <Hero className={style._hero}></Hero>
            <div className={style.trendingNow}>
                <MiniItemPage className={style.miniItemPage}></MiniItemPage>
            </div>
            <AllItem className={style.AllItem}></AllItem>
            {/* <Hero3 className={style._hero}></Hero3>    */}
            </div>
        </div>
    )
}
export default Home;