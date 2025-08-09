import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTelegramPlane, faWhatsapp);

function Contact() {
    return (
        <div className="pt-6 pb-16 flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6 relative">
                <span>კონტაქტი</span>
            </h1>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl">
                {/* დაგვიკავშირდით ქვემოთ ჩამოთვლილ საკონტაქტო მისამართზე */}
            </p>
            <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10 transform transition-all hover:shadow-2xl">
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">საკონტაქტო ინფორმაცია</h2>
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="block w-8 h-1 bg-blue-500 mr-2 rounded-full"></span>
                            სოციალური ქსელები
                        </h3>
                        <div className="flex items-center gap-6 mb-4">
                            <a
                            href="https://wa.me/995511561592"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-300 cursor-pointer"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-xl" />
                            </div>
                            <span className="text-gray-700 font-medium">WhatsApp</span>
                        </a>
                        <a
                            href="https://t.me/DCDge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 cursor-pointer"
                        >
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faTelegramPlane} className="text-blue-500 text-xl" />
                            </div>
                            <span className="text-gray-700 font-medium">Telegram</span>
                        </a>
                        
                    </div>
                        <p className="text-gray-600 mt-2 font-medium pl-3 border-l-2 border-gray-300">+995 511 56 15 92</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="block w-8 h-1 bg-blue-500 mr-2 rounded-full"></span>
                            ელ.ფოსტა
                        </h3>
                        <p className="text-gray-600 font-medium pl-3 border-l-2 border-gray-300">driver2dispatcher@gmail.com</p>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">მოგვწერეთ</h2>
                    <form className="w-full space-y-5">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                სახელი
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                type="text"
                                id="name"
                                placeholder="სახელი"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                ელ.ფოსტა
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                type="email"
                                id="email"
                                placeholder="ელ.ფოსტა"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                შეტყობინება
                            </label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                id="message"
                                rows="5"
                                placeholder="შეტყობინება"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            გაგზავნა
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;