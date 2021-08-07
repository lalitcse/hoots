import React from 'react'
import './Card.css'

function Card(prop) {
    let { name, position, phone, mail, photo } = prop.item
    return (
        <>
        <div className='card card-primary'>
            <i className="fas fa-ellipsis-v dot_ico"></i>
            <div className='img_part'>
                <img src={photo} alt={name} style={{maxWidth: '106%'}} />
            </div>
            <div className='data_part'>
                <div className='doc_name'>
                    <p>{name}</p>
                </div>
                <div className='department'>
                    <p>{position}</p>
                </div>
                <div className='contact'>
                    <i style={{marginRight: '10px'}} className="fas fa-mobile-alt"></i>
                    <label>{phone}</label>
                </div>
                <div className='email'>
                    <i style={{marginRight: '6px'}} className="far fa-envelope"></i>
                    <a href={`mailto:${mail}`}>{mail}</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default Card
