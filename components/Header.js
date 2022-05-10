import Link from 'next/link';

export default function Header() {
  return (
    <header
      className="container"
      style={{ padding: '50px 0 10px 0', display: 'flex', gap: '20px' }}
    >
      <Link href="/">
        <a>home</a>
      </Link>
      <Link href="/user">
        <a>user</a>
      </Link>
      <Link href="/sports">
        <a>sports</a>
      </Link>
      <Link href="/animals">
        <a>animals</a>
      </Link>
    </header>
  );
}
