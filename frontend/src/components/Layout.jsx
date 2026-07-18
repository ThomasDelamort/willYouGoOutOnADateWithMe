const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-pink-500 via-pink-300 to-pink-100 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl px-5 py-8 sm:px-10 sm:py-10 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
