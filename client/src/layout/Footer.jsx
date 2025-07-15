import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10 text-sm text-gray-600 shadow-inner">
      <div className="max-w-screen-md mx-auto px-4 text-center space-y-2">
        <div>
          © {new Date().getFullYear()} <span className="font-semibold text-black">Number Book</span>. All rights reserved.
        </div>
        <div>
          Developed & Maintained by <span className="font-semibold text-black">Rajesh Pachauri</span>
        </div>
        <div>
          📞 Contact No: <a href="tel:+918630394151" className="text-blue-600 hover:underline">+91-8630394151</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
