const Navbar = () => {
  return (
    <div className="h-24 w-full">
      <ul className="flex p-5 gap-5 border-b">
        <li><a href="/">Solo</a></li>
        <li><a href="/multi">Multiplayer</a></li>
      </ul>
    </div>
  );
};

export default Navbar