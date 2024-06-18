import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
    return (
        <main className="container-fluid px-4 my-5">
            <div className="text-center mb-5">
                <h1 className="display-3 fw-bold">Aplikacja do analizy sygnałów EKG</h1>
                <p className="lead">Przesyłanie, przechowywanie, analiza i wizualizacja sygnałów EKG</p>
            </div>
            <div className="card shadow-sm mb-5">
                <div className="card-body">
                    <h2 className="card-title h4">Funkcje aplikacji:</h2>
                    <div className="mt-4">
                        <div className="d-flex mb-3">
                            <div className="flex-shrink-0">
                                <i className="bi bi-arrow-right-circle-fill me-3"></i>
                            </div>
                            <div className="flex-grow-1">
                                <strong>Przesyłanie sygnałów EKG:</strong> Aplikacja służy przesyłaniu sygnałów EKG w formacie WFDB, przechowywania oczyszczonych sygnałów, oraz rysowania wykresów sygnału, na wybranych kanałach.
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="flex-shrink-0">
                                <i className="bi bi-arrow-right-circle-fill me-3"></i>
                            </div>
                            <div className="flex-grow-1">
                                <strong>Wykrywanie załamków:</strong> Aplikacja wykrywa, oraz umożliwia zaznaczanie załamków: P, Q, R, S, T.
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="flex-shrink-0">
                                <i className="bi bi-arrow-right-circle-fill me-3"></i>
                            </div>
                            <div className="flex-grow-1">
                                <strong>Analiza rytmu serca:</strong> Aplikacja umożliwia dokonanie analizy rytmu pracy serca, oraz na jego podstawie dokonanie próby oceny, czy pacjent jest chory na Bradykardię, Tachykardię, czy też ma normalny puls.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-5 mb-4">
                    <img src='/wiertara2.png' className="img-fluid rounded shadow-sm" alt="EKG img 1" />
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-center mb-4">
                    <div className="border-start border-2" style={{height: '100%'}}></div>
                </div>
                <div className="col-md-5 mb-4">
                    <img src='/wiertara.png' className="img-fluid rounded shadow-sm" alt="EKG img 2" />
                </div>
            </div>
        </main>
    );
}
