import Link from "next/link";

function Nav() {
  return (
    <nav className="flex items-center gap-4">
      <Link href="/cabins">Cabins</Link>
      <Link href="/about">About</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}

export default Nav;
