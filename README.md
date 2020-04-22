# microservice-system

## API

### Ticket
- **GET ticket**:
Get informations of all tickets

- **POST /ticket**:
Create a new ticket with a default price of 10

- **GET /ticket/:id**:
Get informations of a specific ticket<br/>
`id` representing a ticket id

- **POST /ticket/:id**:
Book a ticket<br/>
`id` representing a ticket id<br/>
`body: { userId: x (number) }`

- **PUT /ticket/:id**:
Change the status of the ticket to `Available`<br/>
`id` representing a ticket id


### User
- **GET user**: 
Get informations of all users

- **POST user**:
Create a new user<br/>
`body: { funds: x (number) }`

- **GET user/:id**:
Get informations of a specific user<br/>
`id` representing a user id

- **PATCH user/:id**:
Update user funds<br/>
`id` representing a user id<br>
`body: { funds: x (number) }`

- **DELETE user/:id**:
Delete an user<br/>
`id` representing a user id

## Database

### Ticket
- id
- status
- reservedBy
- price

### User
- id
- funds

### Payment
- id
- ticketId
- ticketPrice
- userId
- status
