import uvicorn
import asyncio

from backend.server.database import check_db_connection

if __name__ == '__main__':
    asyncio.run(check_db_connection())
    uvicorn.run('app:app', host='127.0.0.1', port=8000, reload=True)
