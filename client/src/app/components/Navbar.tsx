const Navbar = () => {
  return (
    <div className="h-24 w-full">
      <ul className="flex gap-5 border-b p-5">
        <li>
          <a href="/">Solo</a>
        </li>
        <li>
          <a href="/multi">
            Multiplayer <small>in beta</small>
          </a>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
