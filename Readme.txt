| Test Scenario | Expected Result |
|--------------|------------------|
| GET order with valid ID = 1 | 200 OK |
| GET order with valid ID = 10 | 200 OK |
| GET order with valid ID = 5 | 200 OK |
| GET order with invalid ID = 0 | 400 Bad request |
| GET order with invalid ID > 10 | 400 Bad request |
| GET order with negative ID | 404 Not Found |
| GET order with non-numeric ID | 404 Not Found |
| GET order with empty ID | 500 Internal Server Error |
| PUT order with valid ID = 1 + valid 16-digit API key | 200 OK |
| PUT order with valid ID = 10 +  valid 16-digit API key | 200 OK |
| PUT order with valid ID = 5 + valid 16-digit API key | 200 OK |
| PUT order with valid ID + invalid API key < 16 digits | 401 Unauthorized |
| PUT order with valid ID + invalid API key > 16 digits | 401 Unauthorized |
| PUT order with valid ID + invalid API key with letters | 401 Unauthorized |
| PUT order with valid ID + empty API key | 401 Unauthorized|
| PUT order with non-existing ID = 0 + valid 16-digit API key | 400 Bad request |
| PUT order with non-existing ID > 10 + valid 16-digit API key | 400 Bad request |
| PUT order with empty ID  + valid 16-digit API key | 400 Bad request |
| DELETE order with valid ID = 1 + valid 16-digit API key | 204 No content |
| DELETE order with valid ID = 10 +  valid 16-digit API key | 204 No content |
| DELETE order with valid ID = 5 + valid 16-digit API key | 204 No content |
| DELETE order with valid ID + invalid API key < 16 digits | 401 Unauthorized |
| DELETE order with valid ID + invalid API key > 16 digits | 401 Unauthorized |
| DELETE order with valid ID + invalid API key with letters | 401 Unauthorized |
| DELETE order with valid ID + empty API key | 401 Unauthorized|
| DELETE order with non-existing ID = 0 + valid 16-digit API key | 400 Bad request |
| DELETE order with non-existing ID > 10 + valid 16-digit API key | 400 Bad request |
| DELETE order with empty ID  + valid 16-digit API key | 400 Bad request |