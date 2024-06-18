import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';
import { House, HeartPulse, InfoCircle, Send } from 'react-bootstrap-icons';

const AsideMenu = () => {
    return (
        <aside className="d-flex flex-column vh-100 p-3 bg-light border-end shadow-sm">
            <p className="fs-4 fw-bold text-center border-bottom pb-2 mb-3">Menu</p>
            <nav className="flex-grow-1">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <Link href="/" className="nav-link d-flex align-items-center">
                            <House className="me-2" />
                            <span>Strona główna</span>
                        </Link>
                    </li>
                    <hr className="hr mx-1" />
                    <li className="nav-item">
                        <Link href="/ecg" className="nav-link d-flex align-items-center">
                            <HeartPulse className="me-2" />
                            <span>Analizuj EKG</span>
                        </Link>
                    </li>
                    <hr className="hr mx-1" />
                    <li className="nav-item">
                        <Link href="/about" className="nav-link d-flex align-items-center">
                            <InfoCircle className="me-2" />
                            <span>O nas</span>
                        </Link>
                    </li>
                    <hr className="hr mx-1" />
                    <li className="nav-item">
                        <Link href="/sendEcd" className="nav-link d-flex align-items-center">
                            <Send className="me-2" />
                            <span>Wysyłanie sygnałów</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <p className="mt-auto text-center">Lekarz Doktor</p>
        </aside>
    );
};

export default AsideMenu;
