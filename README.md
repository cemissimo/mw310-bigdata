# mw310-bigdata
## Big Data Architektur für Modul MW310 Design und Realisierung von Big Data Architekturen mit Prof. Dr. Maximilian Coblenz.

### Backend
Der Backend Server kann gestartet werden in dem
1. in den Folder _backend-mw310_ navigiert wird, in dem das _requirements.txt_ File enthalten ist 
2. die benötigen Libraries mit dem Befehl `pip install -r requirements. txt` installiert werden
3. sich in mit dem Befehl `gcloud auth application-default login` authentifiziert wird (User muss aber Zugriff auf die Ressourcen haben)
4. in das Verzeichnis _C:\path\to\repo\mw310\backend-mw310\src_ navigiert wird und im Anschluss der Befehl `uvicorn main:app --reload` im Terminal ausgeführt wird
Im Browser kann dann über den link **http://localhost:8000/docs** die Swagger UI Dokumentation eingesehen werden und die Enpunkte getestet werden.

#### Relevante Endpunkte
- `@app.get("/coupons")` zum generieren der Coupons und Rezepte
- `@app.post("/increment_coupon_counter")` zum "einlösen" der Coupons und inkrementieren times_used Spalte in der Tabell

### Frontend
Der Frontend Server kann gestartet werden in dem 
1. in das Verzeichnis _frontend-mw310_ navigiert wird
2. die benötigten dependencies mit dem Terminal Befehl `npm install` installiert werden
3. der Server mit Terminal Befehl `npm run dev` gestartet wird
Über die Adresse **http://localhost:5173/** erreicht werden

#### Relevante Komponenten im Frontend
- StoreSelection.jsx
- Store.jsx
- Coupon.jsx
