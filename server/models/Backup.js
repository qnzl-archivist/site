const mongoose = require(`mongoose`)

const {
  SchemaTypes: {
    ObjectId,
  }
} = mongoose

const BackupSchema = new mongoose.Schema({
  complete: Boolean,
  adhoc: Boolean,
  url: String,
  date: Date,
  service: {
    type: ObjectId,
    ref: `Token`,
  },
  user: {
    type: ObjectId,
    ref: `User`,
  },
})

const Backup = mongoose.model(`Backup`, BackupSchema)

module.exports = Backup
