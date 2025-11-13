const Footer = () => {
  return (
    <footer className="py-6 mt-8 text-gray-300 bg-gray-800">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} WebBerita. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
