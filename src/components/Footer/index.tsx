interface FooterProps {}

export const Footer = (props: FooterProps) => {
  return (
    <footer className="bg-indigo-600 h-40 py-4 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-sm  sm:text-center">
            © 2022 Aedigi. All rights reserved.
          </div>
          <ul className="flex flex-wrap items-center mt-3 text-sm  sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
