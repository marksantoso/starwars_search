import React from 'react';
import r2loader from '../assets/images/loaders/loader_small.gif';

const Loader = () =>  {
     return (
        <div className="loader">
             <img src={ r2loader } />
             <h4 className="starwars-yellow loading-txt">Searching...</h4>
        </div>
     )
}

export { Loader };
