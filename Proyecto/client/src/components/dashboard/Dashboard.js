import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";



const Dashboard = () => {
     const history = useHistory();

     useEffect(() => {
         if(sessionStorage.getItem('user') === null){
          history.push('/login')
         }
         console.log(sessionStorage.getItem('user'))
     })
     return ( 
          <div className="dashboard">
               <h1>DASHBOARD</h1>
          </div>
      );
}
 
export default Dashboard;