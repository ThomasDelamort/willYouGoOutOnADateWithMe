const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-pink-400 via-pink-200 to-pink-100">
        <div className="w-2xl bg-white rounded-3xl px-8 py-8 shadow-lg">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
