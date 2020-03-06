import React from 'react'

function Success(props){
    setTimeout( ()=>{})
    return(
        <div className={props.value.alertType}>
            {props.value.msg}
        </div>
    );
}
export default Success;