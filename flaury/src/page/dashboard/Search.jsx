import { useState, useEffect } from "react";
import SideNav from "@/components/dashboard/navbar/SideNav";
import NearbySalon from "@/components/shared/NearbySalon";
import { Link } from "react-router-dom";
import Recommended from "@/components/search/Recommended";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const SMALL_VIEWPORT_WIDTH = 900;

const Search = () => {
  const [popup, setPopup] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallViewport(window.innerWidth <= SMALL_VIEWPORT_WIDTH);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const closeSortPopup = () => {
    setPopup(false);
  };

  const renderComponent = () => {
    return (
      <>
        <NearbySalon />
        <Recommended />
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex w-full gap-8 text-primary">
        <div className="mt-4 md:mt-0 w-full">
          <Link to="/dashboard" className="flex gap-2">
            <img src={'/backarrow.svg'} alt="" />
            <h3 className="text-xl font-bold">Search</h3>
          </Link>

          <div className="flex gap-3 my-4">
            {["All", "Spa", "Manicure", "Skin care"].map((label) => (
              <button
                key={label}
                className={`border text-xs px-4 py-1 rounded-full ${label === "All"
                  ? "bg-primary text-white border-primary"
                  : "text-primary border-primary"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
          {renderComponent()}
          {popup && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#db8335] bg-opacity-50">
              <div className="bg-white w-[90%] md:w-[35%] py-8 px-4 md:px-20 rounded-lg shadow-lg text-center relative">
                <p
                  className="cursor-pointer absolute top-4 left-4"
                  onClick={closeSortPopup}
                >
                  Close
                </p>
                <h3 className="font-semibold mb-4 text-black">Sort By</h3>
                <form className="mx-auto text-center text-black">
                  {[
                    { id: "recommended_first", label: "Recommended first" },
                    { id: "distance", label: "Distance (nearest to you)" },
                    { id: "reviews", label: "Reviews (top-rated first)" },
                  ].map(({ id, label }) => (
                    <>
                      <div key={id} className="flex gap-3 my-6">
                        <input type="radio" name="sort" id={id} />
                        <label htmlFor={id}>{label}</label>
                      </div>
                      <hr />
                    </>
                  ))}
                  <hr />
                  <button
                    type="button"
                    className="font-bold py-2 px-8 w-full border border-[#FF770120] mt-4"
                    onClick={closeSortPopup}
                  >
                    Done
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Search;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import SideNav from "@/components/dashboard/SideNav";

// const SMALL_VIEWPORT_WIDTH = 900;

// const Search = () => {
//   const [isSmallViewport, setIsSmallViewport] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallViewport(window.innerWidth <= SMALL_VIEWPORT_WIDTH);
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   return (
//     <div className="flex gap-8 text-primary lg:pr-8">
//       {!isSmallViewport && <SideNav />}
//       <div className="mt-4 md:mt-20 w-full h-screen px-4 md:px-0">
//         <Link to="/dashboard" className="md:hidden block">
//           <img src="/backarrow.svg" alt="" className="pb-4" />
//         </Link>
//         <h2 className="text-2xl font-bold">Search</h2>
//       </div>
//     </div>
//   );
// };

// export default Search;
