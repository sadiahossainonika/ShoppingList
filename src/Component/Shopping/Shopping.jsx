import React, { useEffect, useState } from "react";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const Shopping = () => {
  const notify = () =>
    toast.error("name is required!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  let [list, setList] = useState("");
  let [listerr, setListerr] = useState("");
  let [allshopingli, setAllshoppingli] = useState([]);
  let [editmodal, setEditmodal] = useState(false);

  let [updatemodal, setUpdatemodal] = useState("");
  let [id, setId] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!list) {
      notify()
      setListerr("name is required!");
    } else {
      const db = getDatabase();
      set(push(ref(db, "shoppinglist/")), {
        listdata: list,
      });
    }
  };

  let handleList = (e) => {
    setList(e.target.value);
    setListerr("");
  };

  let handleRemove = (id) => {
    const db = getDatabase();
    remove(ref(db, "shoppinglist/" + id));
  };

  let handleEditmodal = (item) => {
    setEditmodal(true);
    setId(item.id);
  };
  let handleupdatetask = (e) => {
    setUpdatemodal(e.target.value);
  };

  let handleupdate = (e) => {
    const db = getDatabase();
    console.log(updatemodal);
    update(ref(db, "shoppinglist/" + id), {
      listdata: updatemodal,
    });
  };

  useEffect(() => {
    const db = getDatabase();
    const shoppinglistRef = ref(db, "shoppinglist/");
    onValue(shoppinglistRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ value: item.val(), id: item.key });
        setAllshoppingli(array);
      });
    });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="w-[600px] h-auto bg-slate-800 mx-auto mt-10 rounded-2xl p-[20px] ">
        <h1 className="text-white flex text-[60px] items-center ml-[85px] font-bold">
          Sh
          <img src="images/cartimg.png" alt="cart" /> opping List
        </h1>
        <div className="max-w-sm mx-auto mt-5">
          <div className="mb-5 relative "></div>
          <div className="mb-5">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Add list
            </label>
            <input
              onChange={handleList}
              value={list}
              type="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your list"
            />
            <h1 className="text-red-500 mt-2">{listerr}</h1>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-[150px] mt-3"
          >
            Submit
          </button>
          <div
            className="
           ml-[-105px]"
          >
            <div className="w-[390px] h-auto ml-[105px] mt-[20px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center ">
              <div className="">
                <>
                  <ul className="max-w-md  relative space-y-1 text-gray-500  list-inside dark:text-gray-400">
                    {allshopingli.map((item) => (
                      <li className="flex items-center justify-between border border-y-[1px]">
                        <div className="flex items-center">
                          <svg
                            className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0 mt-3 mb-3  "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>
                          {item.value.listdata}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRemove(item.id)}
                            type="Remove"
                            className="text-white bg-red-700 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800  "
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => handleEditmodal(item)}
                            type="Remove"
                            className="text-white bg-green-700 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800  "
                          >
                            Edit
                          </button>
                        </div>
                      </li>
                    ))}
                    {editmodal && (
                      <div className="w-[390px] h-[170px] bg-gray-900 rounded-[32px] absolute top-[-180px] left-[-4px]">
                        {" "}
                        <input
                          onChange={handleupdatetask}
                          type="email"
                          id="email"
                          className="bg-gray-50 ml-[40px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-[40px]"
                          placeholder="Update your name"
                        />
                        <div className="flex gap-3 ml-[100px]">
                          <button
                            onClick={handleupdate}
                            className="text-white bg-green-700  focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setEditmodal(false)}
                            className="text-white bg-red-700  focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </ul>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
