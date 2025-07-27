import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { setCategoryandId } from "../../Features/uiSlice.js";
import { changeStatus } from "../../Features/videoSlice";
import { useCategory } from "../../Hooks/usecategory.js";

// sidebar here is collapsable section which contains the categories info form the youtube api
export const Sidebar = ({ sidebarOpen }) => {
  const dispatch = useDispatch();

  useCategory(); //calling the custom hook that fetches tha data and populate the state using dispatch action

  const categories = useSelector((state) => state.ui.categories);
  const selectedcategoryId = useSelector(
    (state) => state.ui.selectedcategoryId
  );

  console.log("categories from store", categories);

  return (
    <div
      className={`${
        sidebarOpen ? "w-22 sm:w-40" : "w-12"
      } sticky top-20 left-2 h-[calc(100vh-4rem)] overflow-y-auto mt-2 p-2 bg-blue-200 transition-all duration-300 ease-in-out shadow-md shadow-cyan-500/50 `}
    >
      <div className="flex flex-col items-baseline gap-4 mt-2">
        {categories.map((category) => {
          return (
            <div
              key={category.category_id}
              className=" flex cursor-pointer items-center mb-2 w-full wrap font-sans "
              onClick={() => {
                if (selectedcategoryId !== category.category_id) {
                  dispatch(
                    setCategoryandId({
                      newcategory: category.title,
                      categoryid: category.category_id,
                    })
                  );
                }
              }}
            >
              {/*<img src={home} alt="" className="w-5 mr-3" />*/}
              {sidebarOpen && <p className="font-medium">{category.title}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
