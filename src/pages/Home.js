import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import './Home.css'

function Home() {
    let initial = []
    const [doctorData, setDoctorData] = useState(initial)
    useEffect(() => {
        fetch('data.json')
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText)
            }else{
                return response.json()
            }
        })
        .then(data => {
            let temp = {directors: []}
            for(let i = 0; i < data.length; i++){
                if(data[i].position === "Medical director"){
                    temp.directors.push({directorDetails : data[i], hods: []})
                }else if(data[i].position === "Head of department"){
                    temp.directors[temp.directors.length-1].hods.push({hodDetails: data[i], attendeePhysicians: []})
                }else if(data[i].position === "Attending physician"){
                    temp.directors[temp.directors.length-1].hods[temp.directors[temp.directors.length-1].hods.length-1].attendeePhysicians.push(data[i])
                }
            }
            setDoctorData(temp)
        })
        .catch((err) => {
            console.log('error', err)
        })
    }, [])

//    let one = doctorData.directors &&  doctorData.directors.map(item => {
//         console.log(item.directorDetails.phone.slice(item.directorDetails.phone.length-4))
//     })

    return (
        <div>
            <ul className="tree vertical">
                {
                    doctorData.directors &&
                    doctorData.directors.map(item => (
                        <li key={item.directorDetails.phone}>
                            <div>
                                <Card item={item.directorDetails} />
                            </div>
                            <ul>
                                {
                                    item.hods &&
                                    item.hods.map(hod => (
                                    <li key={hod.hodDetails.phone} >
                                        <div>
                                            <Card item={hod.hodDetails} />
                                        </div>
                                        {
                                            hod.attendeePhysicians &&
                                            hod.attendeePhysicians.map(ap => (
                                            <ul key={ap.phone}>
                                                <li>
                                                    <div><Card item={ap} /></div>
                                                </li>
                                            </ul>
                                            ))
                                        }
                                    </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
          </ul>
        </div>
    )
}

export default Home
