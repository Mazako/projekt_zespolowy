// components/AsideMenu.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';

const AsideMenu = () => {
    return (
        <aside className="d-flex flex-column vh-100 mx-3 bg-light border-end ">
            <p className="fs-4 fw-bold">Menu</p>
            <nav className="flex-grow-1">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link href="/ecg"  className="nav-link">Analizuj ECG </Link>
                    </li>
                    <li>
                        <Link href="/about"  className="nav-link">O nas </Link>
                    </li>
                    <li>
                        <Link href="/profil"  className="nav-link">Profil </Link>
                    </li>
                </ul>
            </nav>
            <p>Lekarz Doktor</p> {}
        </aside>
    );
};

export default AsideMenu;
