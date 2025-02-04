# OJT_NEXT_NESTJS

Role_based authentication system using NestJS and NextJS

## Deployment

### Run this project for the first time by docker

Step 1: If run for the first time, change this docker-compose.yml file in backend service like this:

    command:
      [
        './usr/wait-for-it.sh',
        'db:3306',
        '--',
        'npm',
        'run',
        'start:pushdb:prod',
      ]
    # command:
    #   ['./usr/wait-for-it.sh', 'db:3306', '--', 'npm', 'run', 'start:prod']

Step 2: Build the image

```bash
  docker compose build
```

Step 3: Run the container

```bash
  docker compose up
```

Step 4: Open browser

- Frontend: http://localhost:3001
- Backend: http://localhost:3000

### Run this project after build

Step 1: Change this docker-compose.yml file in backend service like this:

    # command:
    #   [
    #     './usr/wait-for-it.sh',
    #     'db:3306',
    #     '--',
    #     'npm',
    #     'run',
    #     'start:pushdb:prod',
    #   ]
    command:
      ['./usr/wait-for-it.sh', 'db:3306', '--', 'npm', 'run', 'start:prod']

Step 2: Run the container

```bash
  docker compose up
```

Step 3: Open browser

- Frontend: http://localhost:3001
- Backend: http://localhost:3000

## Login by Root User to create/assign roles

| Parameter  | Value          |
| :--------- | :------------- |
| `email`    | root@admin.com |
| `password` | password       |
