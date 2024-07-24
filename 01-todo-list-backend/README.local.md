# To start the project

```
cd todo-list-backend
```

```
npm i
```

```
[PORT=3000] npm run start:dev
```

_Example._

```
PORT=3111 npm run start:dev
```

# To use the API

The project will start up with sample data. Everytime the server is rebooted will start with a new fresh sample data.

## API docs

<table>
<thead>
<tr><th>Title</th><th>Command</th></tr>
</thead>
<tbody>
<tr><td style="vertical-align: top;">1. Get todo list.</td><td><code>curl --location 'localhost:3111/todo'</code></td></tr>
<tr><td style="vertical-align: top;">2. Get todo item by ID.</td><td><code>curl --location 'localhost:3111/todo/0BMf4Ny9R'</code></td></tr>
<tr><td style="vertical-align: top;">3. Get todo item by ID.</td><td><code>curl --location 'localhost:3111/todo' \<br/>
--header 'Content-Type: application/json' \<br/>
--data '{<br/>
    "title": "King said, turning.",<br/>
    "scheduledTime": "",<br/>
    "notes": "And she began again. '\''I wonder what you'\''re doing!'\'' cried Alice, with a sigh. '\''I only took the."<br/>
}'</code></td></tr>
<tr><td style="vertical-align: top;">4. Update todo item from twitter to X</td><td><code>curl --location --request PATCH 'localhost:3111/todo/tm6wy4c7s' \<br/>
--header 'Content-Type: application/json' \<br/>
--data '{<br/>
    "title": "X"<br/>
}'</code></td></tr>
<tr><td style="vertical-align: top;">5. Update favorite flag from false to true</td><td><code>curl --location --request PATCH 'localhost:3111/todo/tm6wy4c7s' \<br/>
--header 'Content-Type: application/json' \<br/>
--data '{<br/>
    "favorites": true<br/>
}'</code></td></tr>
<tr><td style="vertical-align: top;">6. Delete todo item</td><td><code>curl --location --request DELETE 'localhost:3111/todo/wnBMJb3co'</code></td></tr>
<tr><td style="vertical-align: top;">7. Reorder post</td><td><code>curl --location --request PUT 'localhost:3111/todo/reorder/szC82qqcZ' \<br/>
--header 'Content-Type: application/json' \<br/>
--data '{<br/>
    "position": 3<br/>
}'</code></td></tr>
</tbody>
</table>

### 1. Get todo list.

```sh
curl --location 'localhost:3111/todo'
```

```json
{
  "data": [
    {
      "id": "5axim8syb",
      "title": "Google",
      "favorites": true,
      "notes": "83274 Felicity Spurs Suite 998",
      "createdAt": "2023-12-22 10:10:41",
      "order": 1
    },
    {
      "id": "tm6wy4c7s",
      "title": "Twitter",
      "favorites": false,
      "scheduledTime": "2024-08-12 13:01:16",
      "notes": "Alice thought the poor little thing sat down and make one quite giddy.",
      "createdAt": "2024-03-22 15:16:16",
      "order": 2
    },
    {
      "id": "pe7lujl0l",
      "title": "Github",
      "favorites": false,
      "scheduledTime": "2024-09-13 19:03:46",
      "notes": "I haven't the slightest idea,",
      "createdAt": "2024-06-07 21:52:52",
      "order": 3
    },
    {
      "id": "5bhx8elav",
      "title": "Vimeo",
      "favorites": false,
      "notes": "",
      "createdAt": "2024-06-16 11:03:35",
      "order": 4
    },
    {
      "id": "0f7hdrwh3",
      "title": "Facebook",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-23 01:26:53",
      "order": 5
    },
    {
      "id": "0BMf4Ny9R",
      "title": "Nike",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-24 00:00:00",
      "order": 6
    },
    {
      "id": "szC82qqcZ",
      "title": "Amazon",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-25 00:00:00",
      "order": 7
    },
    {
      "id": "wnBMJb3co",
      "title": "Tesla",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-26 00:00:00",
      "order": 8
    },
    {
      "id": "gp2amYvwP",
      "title": "Apple",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-27 00:00:00",
      "order": 9
    }
  ],
  "total": 9,
  "success": true,
  "timestamp": "2024-07-24 13:07:00"
}
```

### 2. Get todo item by ID.

```sh
curl --location 'localhost:3111/todo/0BMf4Ny9R'
```

Result:

```json
{
  "data": {
    "id": "0BMf4Ny9R",
    "title": "Nike",
    "favorites": true,
    "scheduledTime": "2024-09-29 18:22:28",
    "notes": "",
    "createdAt": "2024-06-24 00:00:00",
    "order": 6
  },
  "success": true,
  "timestamp": "2024-07-24 13:09:56"
}
```

### 3. Get todo item by ID.

```sh
curl --location 'localhost:3111/todo' \
--header 'Content-Type: application/json' \
--data '{
"title": "King said, turning.",
"scheduledTime": "",
"notes": "And she began again. '\''I wonder what you'\''re doing!'\'' cried Alice, with a sigh. '\''I only took the."
}'
```

Response:

```json
{
  "data": { "id": "87snlfymp" },
  "success": true,
  "timestamp": "2024-07-24 13:35:54"
}
```

### 4. Update todo item from twitter to X

```sh
curl --location --request PATCH 'localhost:3111/todo/tm6wy4c7s' \
--header 'Content-Type: application/json' \
--data '{
    "title": "X"
}'
```

Response:

```json
{
  "id": "tm6wy4c7s",
  "title": "X",
  "favorites": false,
  "scheduledTime": "2024-08-12 13:01:16",
  "notes": "Alice thought the poor little thing sat down and make one quite giddy.",
  "createdAt": "2024-03-22 15:16:16",
  "order": 2
}
```

### 5. Update favorite flag from false to true

```
curl --location --request PATCH 'localhost:3111/todo/tm6wy4c7s' \
--header 'Content-Type: application/json' \
--data '{
    "favorites": true
}'
```

Response:

```json
{
  "id": "tm6wy4c7s",
  "title": "X",
  "favorites": true,
  "scheduledTime": "2024-08-12 13:01:16",
  "notes": "Alice thought the poor little thing sat down and make one quite giddy.",
  "createdAt": "2024-03-22 15:16:16",
  "order": 2
}
```


### 6. Delete todo item

```sh
curl --location --request DELETE 'localhost:3111/todo/wnBMJb3co'
```

Response:

```json
{
  "data": {
    "id": "wnBMJb3co"
  },
  "success": true,
  "timestamp": "2024-07-24 13:42:23"
}
```

### 7. Reorder post

From original order, this API will reorder the list.

Original order:

1. Google
2. Twitter
3. Github
4. Vimeo
5. Facebook
6. Nike
7. Amazon *
8. Tesla
9. Apple

To reorder: move __Amazon__ up to position 3 (between Github and Vimeo).


The final result is the new order:

1. Google
2. Twitter
3. Github
4. Amazon *
5. Vimeo
6. Facebook
7. Nike
8. Tesla
9. Apple

```sh
curl --location --request PUT 'localhost:3111/todo/reorder/szC82qqcZ' \
--header 'Content-Type: application/json' \
--data '{
    "position": 3
}'
```

Response:

```json
{
  "data": [
    {
      "id": "5axim8syb",
      "title": "Google",
      "favorites": true,
      "notes": "83274 Felicity Spurs Suite 998",
      "createdAt": "2023-12-22 10:10:41",
      "order": 1
    },
    {
      "id": "tm6wy4c7s",
      "title": "X",
      "favorites": true,
      "scheduledTime": "2024-08-12 13:01:16",
      "notes": "Alice thought the poor little thing sat down and make one quite giddy.",
      "createdAt": "2024-03-22 15:16:16",
      "order": 2
    },
    {
      "id": "pe7lujl0l",
      "title": "Github",
      "favorites": false,
      "scheduledTime": "2024-09-13 19:03:46",
      "notes": "I haven't the slightest idea,",
      "createdAt": "2024-06-07 21:52:52",
      "order": 3
    },
    {
      "id": "szC82qqcZ",
      "title": "Amazon",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-25 00:00:00",
      "order": 3
    },
    {
      "id": "5bhx8elav",
      "title": "Vimeo",
      "favorites": false,
      "notes": "",
      "createdAt": "2024-06-16 11:03:35",
      "order": 4
    },
    {
      "id": "0f7hdrwh3",
      "title": "Facebook",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-23 01:26:53",
      "order": 5
    },
    {
      "id": "0BMf4Ny9R",
      "title": "Nike",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-24 00:00:00",
      "order": 6
    },
    {
      "id": "gp2amYvwP",
      "title": "Apple",
      "favorites": true,
      "scheduledTime": "2024-09-29 18:22:28",
      "notes": "",
      "createdAt": "2024-06-27 00:00:00",
      "order": 9
    }
  ],
  "success": true,
  "timestamp": "2024-07-24 13:44:43"
}
```
