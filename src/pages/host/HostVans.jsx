import React, { useState, Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  const dataPromise = useLoaderData();

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    );
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </section>
  );
}
// import React from "react";
// import { Link, useLoaderData } from "react-router-dom";
// import { getHostVans } from "../../../api";
// import { requireAuth } from "../../utils";

// export async function loader() {
//   await requireAuth();
//   return getHostVans();
// }

// export default function HostVans() {
//   const vans = useLoaderData();

//   const hostVansEls = vans.map((van) => (
//     <Link to={van.id} key={van.id} className="host-van-link-wrapper">
//       <div className="host-van-single" key={van.id}>
//         <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
//         <div className="host-van-info">
//           <h3>{van.name}</h3>
//           <p>${van.price}/day</p>
//         </div>
//       </div>
//     </Link>
//   ));

//   return (
//     <section>
//       <h1 className="host-vans-title">Your listed vans</h1>
//       <div className="host-vans-list">
//         <section>{hostVansEls}</section>
//       </div>
//     </section>
//   );
// }

// // import React from "react";
// // import { Await, Link, useLoaderData } from "react-router-dom";
// // import { getHostVans } from "../../api";
// // import { requireAuth } from "../../utils";

// // export async function loader() {
// //   await requireAuth();
// //   return getHostVans();
// // }

// // export default function HostVans() {
// //   const vans = useLoaderData();

// //   const hostVansEls = vans.map((van) => (
// //     <Link to={van.id} key={van.id} className="host-van-link-wrapper">
// //       <div className="host-van-single" key={van.id}>
// //         <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
// //         <div className="host-van-info">
// //           <h3>{van.name}</h3>
// //           <p>${van.price}/day</p>
// //         </div>
// //       </div>
// //     </Link>
// //   ));

// //   return (
// //     <section>
// //       <h1 className="host-vans-title">Your listed vans</h1>
// //       <div className="host-vans-list">
// //         <section>{hostVansEls}</section>
// //       </div>
// //     </section>
// //   );
// // }

// // import React, { useState, useEffect } from "react";
// // import { Link, useLoaderData } from "react-router-dom";
// // import { getHostVans } from "../../api";
// // import { requireAuth } from "../../utilis";

// // export async function loader() {
// //   await requireAuth();
// //   return getHostVans();
// // }

// // export default function HostVans() {
// //   const vans = useLoaderData();
// //   // const [vans, setVans] = useState([]);
// //   // useEffect(() => {
// //   //   fetch("/api/host/vans")

// //   //     .then((res) => res.json())
// //   //     .then((data) => setVans(data.vans));
// //   // }, []);

// //   const hostVansEls = vans.map((van) => (
// //     <Link to={van.id} key={van.id} className="host-van-link-wrapper">
// //       <div className="host-van-single" key={van.id}>
// //         <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
// //         <div className="host-van-info">
// //           <h3>{van.name}</h3>
// //           <p>${van.price}/day</p>
// //         </div>
// //       </div>
// //     </Link>
// //   ));

// //   return (
// //     <section>
// //       <h1 className="host-vans-title">Your listed vans</h1>
// //       <div className="host-vans-list">
// //         {/* {vans.length > 0 ? (
// //           <section>{hostVansEls}</section>
// //         ) : (
// //           <h2>Loading...</h2>
// //         )} */}
// //         <section>{hostVansEls}</section>
// //       </div>
// //     </section>
// //   );
// // }
