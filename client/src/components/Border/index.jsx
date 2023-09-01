
import React, {children} from 'react';
import borderImage from '../../../public/button-images/border.png'; 

function BorderComponent({children}) {
    return (
        <div className="border-container" style={{ borderImage: `url(${borderImage}) 30 round`, border: '30px solid transparent' }}>
           {children}
        </div>
    );
}

export default BorderComponent;
