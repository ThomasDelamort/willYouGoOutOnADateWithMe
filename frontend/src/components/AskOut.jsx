const AskOut = () => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-pink-400 via-pink-200 to-pink-100">
        <div className="w-2xl bg-white rounded-3xl px-8 py-8 shadow-lg">
          <h1 className="text-2xl font-extrabold text-center">
            Will <span className="text-red-400">you</span> go out on a{" "}
            <span className="text-red-400">date</span> with me?
          </h1>
          <div className="flex justify-center my-4">
            <img />
          </div>
          <div className="flex justify-center mt-6 space-x-3">
            <button className="px-6 py-3 font-semibold text-white bg-red-500 rounded-2xl hover:bg-red-600 transition">
              Yes I'd love to
            </button>
            <button className="px-6 py-3 font-semi-bold text-white bg-gray-500 rounded-2xl hover:bg-gray-600 transition">
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskOut;
