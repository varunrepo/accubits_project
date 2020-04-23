# Accubits Interview Task
 Create an Express Application for

1. Registering User, API which  have following fields
  ·name
  ·email
  ·Password
  Method :  POST

2. Login screen, where the registered user can login

3. Active session listing screen, where the active sessions of the logged in user will be shown

Sessions / user tokens need to be saved in Redis and the Active sessions should update when a new user logged  in real time using socket.
Database : MongoDB
Create necessary frontend using Angular 7+ and integrate the APIs

# Completed Task
1. New User can be registered based on email id
2. JWT Token will be generated based on successfull user login 
3. JWT token is stored on the REDIS
4. List of active session details will be displayed

Notes:
To run a node server

npm install
npm run start

Postman request is also available in the git



