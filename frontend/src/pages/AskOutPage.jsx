import { useState } from "react";

const AskOutPage = () => {
  const [y, setY] = useState();
  const [x, setX] = useState();
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-pink-400 via-pink-200 to-pink-100">
        <div className="w-2xl bg-white rounded-3xl px-8 py-8 shadow-lg">
          <h1 className="text-5xl font-extrabold text-center">
            Will <span className="text-red-400">you</span> go out on a{" "}
            <span className="text-red-400">date</span> with me?
          </h1>
          <div className="flex justify-center my-10">
            <img src="/cute.jpg" alt="cute photo" />
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            <button className="px-6 py-3 font-semibold text-white bg-linear-to-r from-pink-700 to-pink-400 rounded-3xl hover:bg-pink-200 transition shadow-md">
              Yes I'd love to
            </button>
            <button
              onMouseEnter={() => {
                setY(Math.floor(Math.random() * 300));
                setX(Math.floor(Math.random() * 500));
              }}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className={` px-6 py-3 font-semi-bold text-white bg-red-500 rounded-3xl hover:bg-gray-600`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskOutPage;
``;
