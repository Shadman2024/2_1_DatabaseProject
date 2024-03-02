import React, { Fragment } from "react";
import "./categorynavBar.css";
const CategoryNavBar = () => {
    return (
        <Fragment>
            <div class="category-navbar" style={{
            background: 'rgb(36,0,35)',
            background: 'linear-gradient(90deg, hsla(211, 66%, 87%, 1) 0%, hsla(348, 67%, 88%, 1) 50%, hsla(272, 26%, 72%, 1) 100%)'
        }}>
                <Link to=  "#category1" class="category-item">BOOKS</Link>
                <Link to=  "#category2" class="category-item">ELECTRONICS</Link>
                <Link to=  "#category3" class="category-item">GADGETS</Link>
                <Link to=  "#category3" class="category-item">HEALTH AND BEAUTY</Link>
                <Link to=  "#category3" class="category-item">FURNITURE & DECOR</Link>
            </div>
        </Fragment>
    )
}
export default CategoryNavBar;