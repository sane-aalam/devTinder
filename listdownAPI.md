# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API

## connectionRequestRouter

- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId
- POST /request/send/interested/:fromUserId
- POST /request/send/ignored/:fromUserId
- POST /request/send/{both}/:userId

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignored, interested, accepeted, rejected
