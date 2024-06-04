export default function Home() {
    return (
        <main>
            <h1 className="display-2 text-center my-5">Aplikacja do analizy sygnałów EKG</h1>
            <p>Aplikacja służy przesyłaniu sygnałów EKG w formacie WFDB, przechowywania oczyszczonych sygnałów, oraz
                rysowania wykresów sygnału, na wybranych kanałach</p>
            <p>Aplikacja wykrywa, oraz umożliwia zaznaczanie załamków: P, Q, R, S, T</p>
            <p>Aplikacja umożliwia dokonanie analizy rytmu pracy serca, oraz na jego podstawie dokonanie próby oceny,
                czy pacjent jest chory na Bradykardię, Tachykardię, czy też ma normalny puls.</p>

            <div className="text-center w-100 my-5">
                <img src='/wiertarajpg.jpg' width={600}/>
            </div>
        </main>
    );
}
