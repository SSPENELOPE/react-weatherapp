import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

function footer() {
    const handleDownload = () => {
        const fileUrl = 
        'https://starweatherapi.azurewebsites.net/api/DownloadApplication/DownloadFile';
        // create a link element
        const link = document.createElement('a');
        // set the link's href to the file URL
        link.href = fileUrl;
        // set the link's download attribute to the file name
        link.download = 'my-file.exe';
        // simulate a click on the link to trigger the download
        link.click();

        setTimeout(() => {
            toast.success(`Your download has started`, {
                position: toast.POSITION.TOP_CENTER,
                draggable: false
            }, 1000)
        })
    }

    return ( 
        <div className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3 className="font my-2"><u>About</u></h3>
                    <a 
                    className="font my-2" 
                    href="https://github.com/SSPENELOPE/react-weatherapp"
                    target="_blank"
                     rel="noreferrer"
                    >Github
                    </a>

                    <a 
                    className="font my-2" 
                    href="https://www.linkedin.com/in/tyler-poepping-3931b123b/"
                    target="_blank"
                     rel="noreferrer"
                    >LinkedvIn
                    </a>

                    <a 
                    className="font my-2"
                    href="https://poepping-portfolio.herokuapp.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    >Portfolio
                    </a>
                </div>
                <div className="footer-column">
                    <h3 className="font my-2"><u>Downloads</u></h3>
                    <button className="btn cust-btn" onClick={handleDownload}>
                        Download for Windows
                        &nbsp;
                        <FontAwesomeIcon icon={faWindows} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default footer;