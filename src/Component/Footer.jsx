import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <footer className="relative left-0 bottom-0 w-full bg-gray-800 text-white py-5 px-5 sm:px-20 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-20">
      <section className="text-center sm:text-left text-lg ext-red-500">
        © {year} | All rights reserved
      </section>

      <section className="flex items-center justify-center gap-5 text-2xl">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          <BsFacebook />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          <BsInstagram />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition-colors duration-300"
        >
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
