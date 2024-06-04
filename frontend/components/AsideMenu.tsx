// components/AsideMenu.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';

const AsideMenu = () => {
    return (
        <aside className="d-flex flex-column vh-100 mx-3 bg-light border-end ">
            <p className="fs-4 fw-bold m-0 p-0 text-center">Menu</p>
            <nav className="flex-grow-1">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link href="/"  className="nav-link">Strona główna</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/ecg"  className="nav-link">Analizuj EKG </Link>
                    </li>
                    <li>
                        <Link href="/about"  className="nav-link">O nas </Link>
                    </li>
                    <li>
                        <Link href="/sendEcd"  className="nav-link">Wysyłanie sygnałów</Link>
                    </li>
                </ul>
            </nav>
            <p>Lekarz Doktor</p> {}
        </aside>
    );
};

export default AsideMenu;
