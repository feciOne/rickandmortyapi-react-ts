import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card(props: { data: { id: number, name: string, image: string } }) {
  const data = props.data;
  let navigate = useNavigate();

  return (
    <article className="col-sm-6">
      <div className="shadow card mb-3" onClick={() => navigate("/detail/" + data.id )}>
        <div className="row g-0">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <img src={data.image} height={152} className="rounded-start" alt={data.name} />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-8">
            <div className="card-body">
              <h5 className="card-title">Character Card: {data.id}</h5>
              <p className="card-text">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;