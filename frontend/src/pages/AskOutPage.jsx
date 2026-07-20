import { useState, useRef } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const AskOutPage = () => {
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);
  const navigate = useNavigate();
  const noBtnRef = useRef(null);

  const dodge = () => {
    const btn = noBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();

    const maxLeft = -rect.left + 8;
    const maxRight = window.innerWidth - rect.right - 8;
    const maxUp = -rect.top + 8;
    const maxDown = window.innerHeight - rect.bottom - 8;

    const dx = x + Math.random() * (maxRight - maxLeft) + maxLeft;
    const dy = y + Math.random() * (maxDown - maxUp) + maxUp;

    setX(dx);
    setY(dy);
  };

  return (
    <Layout>
      <h1 className="text-5xl font-extrabold text-center">
        Will <span className="text-red-400">you</span> go out on a{" "}
        <span className="text-red-400">date</span> with me?
      </h1>
      <div className="flex justify-center my-10">
        <img
          src="/cute2.gif"
          alt="cute gif"
          style={{ width: "250px", height: "auto" }}
        />
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="px-6 py-3 font-semibold text-white rounded-3xl bg-linear-to-r from-pink-700 to-pink-400 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl hover:from-pink-800 hover:to-pink-500 hover:-translate-y-0.5 active:scale-95"
          onClick={() => navigate("/set-date")}
        >
          Yes I'd love to
        </button>
        <button
          ref={noBtnRef}
          onMouseEnter={dodge}
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
