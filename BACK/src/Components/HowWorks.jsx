
function HowWorks() {
  return (
    <>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 tracking-wide">
            როგორ მუშაობს
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {["რეგისტრაცია", "მოძებნეთ მძღოლი/დისპეტჩერი", "დაიწყეთ თანამშრომლობა"].map((title, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0c4c83] to-[#1594D3] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#1594D3] transition-colors duration-300">{title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {index === 0 ? "შექმენით ანგარიში და მიიღეთ წვდომა ჩვენს პლატფორმაზე." :
                            index === 1 ? "იპოვეთ დისპეტჩერი ან მძღოლი, რომელიც შეესაბამება თქვენს მოთხოვნებს." :
                            "დაიწყეთ მუშაობა და ისარგებლეთ ჩვენი სერვისებით."}
                    </p>
                </div>
            ))}
        </div>
        {/* <div className="mt-12 flex justify-center">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/example-video-id"
                title="How It Works Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl shadow-2xl w-full max-w-3xl"
            ></iframe>
        </div> */}
    </>
  )
}

export default HowWorks
