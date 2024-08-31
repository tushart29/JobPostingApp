import React from 'react'


// takes in children to whatever we wrap. if we pass in h1 in card then that would be h1
function Card({ children, bg = 'bg-gray-100' }) {
    return (
        <div className={` ${bg} p-6 rounded-lg shadow-md`}>
            {children}
        </div>
    )
}

export default Card
