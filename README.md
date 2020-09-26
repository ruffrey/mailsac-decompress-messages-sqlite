## Prereqs

- Node.js >= 12
- `npm install` in this repo
- copy of mailsac public message files

## Usage

```
SQLITE_DB_FILE="./mailsac-public-messages-20200926.sqlite" LIMIT=100 OFFSET=0 node decompress.js
```

which outputs a file per message at `message_files/`
