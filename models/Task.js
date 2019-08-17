const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskType: {
    type: String,
    required: true,
    unique: true
  },

  taskContent: {
    type: String,
    required: true,
  },

  taskComplete: {
    type: Boolean,
    default: false
  },

  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

TaskSchema.post("save", function() {
  console.log("pre save middleware running")
  console.log(this.creatorID)
  User.findByIdAndUpdate(this.creatorID, { $push: { taskIDs: this._id } }, { new: true })
    .then((result) => {
      console.log(result)
    })
    .catch((err) => console.log(err))
})

TaskSchema.pre("remove", function(next) {
  console.log("pre remove middleware running");
  User.findByIdAndUpdate(this.creatorID, { $pull: { taskIDs: this._id } }, { new: true })
    .then(result => {
      console.log(result);
      next()
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
})

module.exports = Task = mongoose.model("Task", TaskSchema)