import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>mk</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1610302529432-7cab247927e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{color:'red'}}>favorite</i>

          <h6>title</h6>
          <p>this is amazing post</p>
          <input type="text" placeholder="comments" />
        </div>
      </div>
    </div>
  );
};

export default Home;
