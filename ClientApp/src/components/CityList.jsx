import React, {useEffect} from "react";
import loadcities from "../utils/loadcities";

function CityList(props) {
    useEffect(() => {
        loadcities.loadProfileCities(props)
      }, []);
    
    return (
        <div>
            <div className="">
                <h2 className="font justify-self-start"><u>Prevously Searched</u></h2>
                <ul id="profileCityList" className="offCanvasSearched">
                    {/* Previously Searched Cities Will Appear Here */}
                </ul>
            </div>
        </div>
    )
}

export default CityList;