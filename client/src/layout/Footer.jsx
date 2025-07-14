import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 text-sm text-gray-600">
      © {new Date().getFullYear()} Number Book. All rights reserved.
    </footer>
  );
};

export default Footer;
