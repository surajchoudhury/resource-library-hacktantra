const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const studentSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      match: /@.*[.]/,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 6
    },
    isMentor: {
      type: Boolean,
      default: false
    },
    completedModules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module"
      }
    ]
  },
  { timestamps: true }
);

studentSchema.pre("save", function(next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, password) => {
      if (err) return next(err);
      this.password = password;
      next();
    });
  } else {
    next();
  }
});

studentSchema.methods.verifyPassword = (password, done) => {
  bcrypt.compare(password, this.password, (err, matched) => {
    if (err) return done(null, false);
    done(null, matched);
  });
};

const Student = mongoose.model("Student", studentSchema);
mongoose.model = Student;
