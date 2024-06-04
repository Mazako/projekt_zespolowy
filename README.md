# Instrukcja instalacji
## Do zainstalowania:
- Node.js https://nodejs.org/en
- Docker https://www.docker.com/products/docker-desktop/
- Python 3.11

Po zainstalowaniu, upewnić się że wszystkie rzeczy zostały pomyślnie zainstalowanie po przez sprawdzenie czy są wykrywane w terminalu komputerze (python/node) oraz czy docker desktop uruchamia się poprawnie

## Uruchamianie aplikcaji
### Baza danych
W folderze `Database` wpisać komendę:
```
docker compose up
```

### Backend
W katalogu backend wpisać komendę:
```
pip install -r ./requirements.txt
```
Następnie uruchomić aplikację komendą:
```
uvicorn server.app:app --port 8000
```

### Frontend
W katalogu frontend wpisać komendę:
```
npm i
```
Następnie:
```
npm run dev
```
Aplikacja będzie dostępna w przeglądarce po wpisaniu adresu http://localhost:3000

### Dataset
https://physionet.org/content/ecg-arrhythmia/1.0.0/
