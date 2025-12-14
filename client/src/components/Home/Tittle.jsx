import React from "react";

const Tittle = ({tittle,description}) => {
    return (
        <div className="text-center mt-6 text-slate-700">
            <h2 className="text-3xl sm:text-4xl font-medium">{tittle}</h2>
            <p className="max-sm max-w-2xl mt4 text-slate-700">{description}</p>
        </div>
    )
}

export default Tittle