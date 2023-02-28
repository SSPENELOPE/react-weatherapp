import React from "react";

function Hourly(props) {
    const hourly = props.hourly.slice(0, 7)
    return (
        <table className="tbody">
            <thead>
                <tr>
                    <th className="font text-center">Hourly Temprature</th>
                </tr>
            </thead>
            <tbody className="d-flex flex-column align-items-center">
                {hourly.map((item, Index) => (
                    <tr key={Index} className="table-rows">
                        <td className="font table-cell">
                            {new Date(item.dt * 1000).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true
                            })}
                        </td>
                        <td className="font table-cell">{item.temp}<span>&#8457;</span></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Hourly;