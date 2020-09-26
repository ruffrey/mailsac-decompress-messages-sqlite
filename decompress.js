const sqlite3 = require('sqlite3')
const zlib = require('zlib')
const fs = require('fs')

if (!process.env.SQLITE_DB_FILE) {
  console.error("Missing environment variable SQLITE_DB_FILE")
  process.exit(1)
}

const OFFSET = process.env.OFFSET || 0;
const LIMIT = process.env.LIMIT || 100;

const db = new sqlite3.Database(process.env.SQLITE_DB_FILE)

const sql = `SELECT _id, compression_format, message_raw FROM messages LIMIT ${LIMIT} OFFSET ${OFFSET}`
console.log(sql);

db.serialize(() => {
  db.each(sql, (err, row) => {
      if (err) throw err

      const algo = row.compression_format === "b" 
        ? zlib.brotliDecompressSync 
        : zlib.inflateRawSync;
      const file = `message_files/${row._id}.eml`
      fs.writeFileSync(file, algo(row.message_raw).toString("utf8"))
      console.log(file, row.message_raw.length)
  })
})
