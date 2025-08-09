import { Oval } from 'react-loader-spinner';

function Loader() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-white z-40 opacity-100"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col justify-center items-center gap-5">

          <Oval
            visible={true}
            height="100"
            width="100"
            color="#1594D3"
            ariaLabel="oval-loading"
            secondaryColor="#77aaff"
            strokeWidth={6}
            strokeWidthSecondary={6}
            wrapperClass="loader-spinner"
          />

          <div className="text-center text-xl font-semibold text-gray-700 mt-4 animate-fadeIn">
            <p className="tracking-wider">გთხოვთ დაელოდეთ...</p>
          </div>
        </div>
      </div>

      {/* Adding some style for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}

export default Loader;
