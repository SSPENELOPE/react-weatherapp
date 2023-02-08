import React, {useState} from "react";
const cityList = document.getElementById("city-list");


function Header() {
    // Set the button state
    const [btn, setBtn] = useState(true);

    // Hide and show the clear button
    const showBtn = ()  => {
        setBtn(true)
    }
    const hideBtn = () => {
        setBtn(false);
    }
    
    // Will fix this later to update the page based on the element having a list or not
    const checkIfCities = () => {
        while(!cityList.hasChildNodes) {
            setBtn(false)
        }
    }
    
    

    return (
        <header className="custom-header text-center p-3">
            <h1 className="text-light">Weather Dashboard</h1>
            <section className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-start">
                    <input type="text" placeholder="Find a City" id="city" className="p-1 m-1 bg-dark text-light"></input>
                    <button type="submit" className="m-1 bg-primary rounded custom-button" id="search" onClick={showBtn}>Search</button>
                </div>
                <div className="row align-items-center justify-content-between">
                    <div className="row listDiv">
                        <h3 className="my-2 d-flex">Previously Viewed:</h3>
                        <ul className="cities-list mx-3" id="city-list">
                    
                        </ul>
                    </div>
                    {btn ? (
                    <div>    
                        <button id="clear-button" onClick={hideBtn}>Clear Previously Viewed</button>
                    </div>
                    ) : (
                        <span></span>
                    )}
                </div>
            </section>
        </header>
    )
}

export default Header;