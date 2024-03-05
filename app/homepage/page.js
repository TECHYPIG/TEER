import "./home.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className="home-container">
      <div className="navbar">
        <p className="nav-txt">
          <a href="#homepage">TEER</a>
        </p>
        <p className="Search">
        Search:
        </p>
      </div>
      <div className="side-profile">
      <p className="Profile-picture">
      <Image
              src=""
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
        </p>
        <p className="User-details">
        
        </p>
        <p className="socials">
          <a href="#instagram">@instagram</a>
          <a href="#X">@X</a>
          <a href="#LinkedIn">@LinkedIn</a>
        </p>
      </div>
    </main>
  );
}

