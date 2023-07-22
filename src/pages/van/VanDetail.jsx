import React from "react";
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
import { getVan } from "../../../api";

export function loader({ params }) {
  return getVan(params.id);
}

export default function VanDetail() {
  const location = useLocation();
  const van = useLoaderData();

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
// import { getVans } from "../../../api";

// export function loader({ params }) {
//   return getVans(params);
// }

// export default function VanDetail() {
//   // const params = useParams();
//   const location = useLocation();
//   const van = useLoaderData();

//   // const [van, setVan] = useState(null);

//   // useEffect(() => {
//   //   fetch(`/api/vans/${params.id}`)
//   //     .then((res) => res.json())
//   //     .then((data) => setVan(data.vans));
//   // }, [params.id]);
//   const search = location.state?.search || "";
//   const type = location.state?.type || "all";

//   <Link to={`..${search}`} relative="path" className="back-button">
//     &larr; <span>Back to {type} vans</span>
//   </Link>;

//   return (
//     <div className="van-detail-container">
//       {van ? (
//         <div className="van-detail">
//           <img src={van.imageUrl} />
//           <i className={`van-type ${van.type} selected`}>{van.type}</i>
//           <h2>{van.name}</h2>
//           <p className="van-price">
//             <span>${van.price}</span>/day
//           </p>
//           <p>{van.description}</p>
//           <button className="link-button">Rent this van</button>
//         </div>
//       ) : (
//         <h2>Loading...</h2>
//       )}
//     </div>
//   );
// }
