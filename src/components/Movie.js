import React from 'react'

const Movie = (props) => {
    const NewPrice =  Math.floor(props.price)
    return (
        <div className="col s12 m6 l3">
            <div className="card">
                <div className="card-image wave-effect wave-blockwave-light">
                    {
                        props.image === null ? <div>No img</div> : 
                        <>
                        <img src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="card image" style={{ width: "100%", height: 360 }}/>
                        </>
                    }
                </div>
                <div className="card-content">
                    <p style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>price : ${NewPrice} 
                    <a class="btn-floating" onClick={() => props.handleIncrease(props)}><i class="material-icons">add</i></a>
                    </p>
                </div>
            </div>            
        </div>
    )
}

export default Movie
