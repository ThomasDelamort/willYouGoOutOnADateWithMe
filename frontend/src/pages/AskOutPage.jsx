import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const AskOutPage = () => {
  const [y, setY] = useState();
  const [x, setX] = useState();
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="text-5xl font-extrabold text-center">
        Will <span className="text-red-400">you</span> go out on a{" "}
        <span className="text-red-400">date</span> with me?
      </h1>
      <div className="flex justify-center my-10">
        <img src="/cute.jpg" alt="cute photo" />
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="px-6 py-3 font-semibold text-white rounded-3xl bg-linear-to-r from-pink-700 to-pink-400 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl hover:from-pink-800 hover:to-pink-500 hover:-translate-y-0.5 active:scale-95"
          onClick={() => navigate("/set-date")}
        >
          Yes I'd love to
        </button>
        <button
          onMouseEnter={() => {
            setY(Math.floor(Math.random() * 350));
            setX(Math.floor(Math.random() * 700));
          }}
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
          className="px-6 py-3 font-semibold text-white bg-red-500 rounded-3xl hover:bg-gray-600"
        >
          No
        </button>
      </div>
    </Layout>
  );
};

export default AskOutPage;
