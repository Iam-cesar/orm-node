class Database {
  init (connection) {
    this.connection = connection

    this.createDatabase()
  }

  createDatabase () {
    const sql = 'CREATE DATABASE IF NOT EXISTS escola'

    this.connection.query(sql, err => {
      if (err) {
        console.log(err)
      }
    })
  }
}

module.exports = new Database()
