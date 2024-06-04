const About = () => {

    return (
        <>
            <div className="d-flex justify-content-around gap-3 my-1">
                <div className="w-50" style={{borderRight: '1px solid black'}}>
                    <p className="display-3">Autorzy:</p>
                    <ul>
                        <li >Jakub Frydrych</li>
                        <li>Michał Maziarz</li>
                    </ul>
                </div>
                <div className="w-50 d-flex flex-column align-items-center gap-3">
                    <img src="/pwr.png" width="500"/>

                    <p className="fw-bold">[Aplikacja zrealizowana w ramach kursu Projekt Zespołowy na Politechnice
                        Wrocławskiej]</p>
                </div>
            </div>

        </>);

};
export default About;
