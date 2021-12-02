import React from 'react'
import { useEffect, useState } from 'react';
import './covid.css';


const Covid = () => {

    const [data, setData] = useState([])
    const [active, setactive] = useState([])
    const [recovered, setrecovered] = useState([])
    const [death, setdeath] = useState([])
    const [tests, settests] = useState([])
    const [indexCountry, setindexCountry] = useState([])



    const getCovidData = async () => {
        fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                console.log("datahere", data);

                setData(data.map(val => val.country));
                setactive(data.map(val => val.active));
                setrecovered(data.map(val => val.recovered));
                setdeath(data.map(val => val.deaths));
                settests(data.map(val => val.tests));

               

            });

    }

    console.log("active",active)
    console.log("recovered",recovered)
    console.log("death",death)
    console.log("tests",tests)
    console.log("indexCountry",indexCountry);
    useEffect(() => {
        getCovidData();
    }, [])

    const [currentCountry, setCurrentCountry] = useState('')

    const changeCountry = (selectedCountry) => {
        setCurrentCountry(selectedCountry);
        var index = data.indexOf(selectedCountry);
        console.log("index", index);
        setindexCountry(index);
    }

    console.log("cf", currentCountry);
    return (
        <>


            <h4 className='zoom'>🔴 LIVE</h4>
            <h1>COVID-19 CORONAVIRUS TRACKER</h1>
            <form>
                <select
                    onChange={(event) => changeCountry(event.target.value)}
                    value={currentCountry}
                >
                    {
                        data.map(key => (
                            <option value={key} key={key}>{key}</option>
                        ))
                    }

                </select>
            </form>

            
                
                    <div className='row'>
                        <div className='column'>
                            <div className='card country'>
                                <p className='card_name'> COUNTRY</p>
                                <p className='card_value'>{currentCountry}</p>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='card'>
                                <p className='card_name'><span>TOTAL</span> RECOVERED</p>
                                <p className='card_value'>{recovered[indexCountry]}</p>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='card'>
                                <p className='card_name'><span>TOTAL</span> CONFIRMED</p>
                                <p className='card_value'>{tests[indexCountry]}</p>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='card'>
                                <p className='card_name'><span>TOTAL</span> DEATHS</p>
                                <p className='card_value'>{death[indexCountry]}</p>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='card'>
                                <p className='card_name'><span>TOTAL</span> ACTIVE</p>
                                <p className='card_value'>{active[indexCountry]}</p>
                            </div>
                        </div>
                        {/* <div className='column'>
                            <div className='card'>
                                <p className='card_name'><span>TOTAL</span> UPDATED</p>
                                <p className='card_value'>{val.lastupdatedtime}</p>
                            </div>
                        </div> */}
                    </div>
                
            

        </>
    )
}

export default Covid
