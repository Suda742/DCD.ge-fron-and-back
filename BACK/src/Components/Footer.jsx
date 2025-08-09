import { Link, useNavigate } from "react-router-dom";
import whiteLogo from './../../public/images/logo/DCD_white_logo.png';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import tc from './../../public/files/terms.pdf';
import pp from './../../public/files/privacy.pdf';
import mastercard from './../../public/images/cards/mastercard.png';
import visa from './../../public/images/cards/visa.png';

function Footer() {
      const navigate = useNavigate();
  
  const handleClickSectionButton = (sectionName, offset = 0) => {
    if (window.location.pathname === "/") {
        const sectionElement = document.getElementById(sectionName);
        if (sectionElement) {
            const topPosition = sectionElement.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top: topPosition, behavior: "smooth" });
        }
        window.history.replaceState(null, "", `/#${sectionName}`);
    } else {
        navigate("/", { state: { scrollTo: sectionName, offset } });
    }
};


  return (
    <footer className="relative mt-10 bg-gradient-to-b from-[#0c4c83] via-[#175a9c] to-[#0a3a66] text-white w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="pt-10 lg:pt-16 lg:pb-12 container mx-auto">
          {/* Desktop Version */}
          <div className="hidden lg:flex flex-wrap justify-between">
            {/* Company & Navigation Links */}
            <div className="w-full md:w-auto mb-10 md:mb-0 flex flex-col justify-center items-center">
              <img 
                className="w-48 mb-8 transform hover:scale-105 transition-transform duration-300 drop-shadow-lg" 
                src={whiteLogo} 
                alt="DCD Logo" 
              />
              <p className="max-w-xs text-white mb-6 text-center">
                იპოვე მძღოლი ან დისპეტჩერი DCD.ge-ზე და დაიწყე წარმატებული საქმიანობა დღესვე
              </p>
            </div>

            {/* Quick Links */}
            <div className="w-full md:w-auto mb-10 md:mb-0">
              <h3 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                გვერდები
              </h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    კონტაქტი
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleClickSectionButton('how-it-works', -200)}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    როგორ მუშაობს
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleClickSectionButton('about', -200)}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    ჩვენს შესახებ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleClickSectionButton('pricing', -200)}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    ფასები
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="w-full md:w-auto mb-10 md:mb-0">
              <h3 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                პირობები
              </h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href={pp}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    კონფიდენციალურობის პოლიტიკა
                  </a>
                </li>
                <li>
                  <a 
                    href={tc}
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    წესები და პირობები
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="w-full md:w-auto">
              <h3 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                კონტაქტი
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-300" />
                  <a href="mailto:driver2dispatcher@gmail.com" className="text-blue-100 hover:text-white transition-colors duration-200">
                    driver2dispatcher@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-blue-300" />
                  <span className="text-blue-100">
                    Telegram / Whatsapp: +995 511 56 15 92
                  </span>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="text-sm uppercase tracking-wider text-blue-300 mb-3">გამოგვყევით</h4>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61565834870616" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/dcd.ge/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 rounded-full flex items-center justify-center transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version - Redesigned to match the image */}
          <div className="lg:hidden flex flex-col items-center">
            <img 
              className="w-24" 
              src={whiteLogo} 
              alt="DCD Logo" 
            />
            <div className="w-full text-center border-b border-blue-700 pb-4 mt-2 mb-4">
                  <p className="text-white text-sm px-4">
                    იპოვე მძღოლი ან დისპეტჩერი DCD.ge-ზე და დაიწყე წარმატებული საქმიანობა დღესვე
                  </p>
                </div>
            
            <div className="w-full flex flex-col items-center mb-10">
              {/* Two Columns Layout for Navigation */}
                <div className="flex flex-col items-center space-y-4 mb-2">
                  <h3 className="text-xl font-bold mb-3">გვერდები</h3>

                  <Link 
                    to='/contact' 
                    className="text-white text-sm"
                  >
                    კონტაქტი
                  </Link>
                  <button 
                    onClick={() => handleClickSectionButton('how-it-works', -200)}
                    className="text-white text-sm"
                  >
                    როგორ მუშაობს
                  </button>
                
                  <button 
                    onClick={() => handleClickSectionButton('about', -200)}
                    className="text-white text-sm"
                  >
                    ჩვენს შესახებ
                  </button>
                  <button 
                    onClick={() => handleClickSectionButton('pricing', -200)}
                    className="text-white text-sm"
                  >
                    ფასები
                  </button>
                </div>

                <div className="w-full border-y border-blue-700 py-4 mt-2 flex flex-col items-center">
                  <h3 className="text-xl font-bold mb-3">იურიდიული ინფორმაცია</h3>
                  <div className="flex flex-col items-center space-y-3">
                    <a 
                      href={pp}
                      className="text-white text-sm hover:text-blue-200"
                    >
                      კონფიდენციალურობის პოლიტიკა
                    </a>
                    <a 
                      href={tc}
                      className="text-white text-sm hover:text-blue-200"
                    >
                      წესები და პირობები
                    </a>
                  </div>
                </div>
              
              {/* Contact Section */}
              <h3 className="text-xl font-bold mb-4 mt-4">კონტაქტი</h3>
              <div className="flex flex-col items-center space-y-2 text-sm">
                <a href="mailto:driver2dispatcher@gmail.com" className="text-white">
                  driver2dispatcher@gmail.com
                </a>
                <p className="text-white">
                  +995 511 56 15 92
                </p>

                {/* Add legal links to mobile version */}

                {/* Add company description to mobile version */}
                

                <div className="flex justify-center gap-4 mt-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61565834870616" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-white text-xl" />
                  </a>
                  <a 
                    href="https://www.instagram.com/dcd.ge/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-white text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-2">
         <div className="flex items-center gap-4 py-4 bg-white p-5 rounded-lg shadow-lg">
           <div className=""><img width={30} src={visa} alt="Visa" /></div>
            <div><img width={30} src={mastercard} alt="Mastercard" /></div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 py-6 text-center text-sm text-blue-300 pb-32 lg:pb-6">
          <p>© {new Date().getFullYear()} DCD.ge - ყველა უფლება დაცულია</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;