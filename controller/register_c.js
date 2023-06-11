// core module
const path = require("path");

//env
const domain = process.env.domain;

// utils
const createDBObject = require("../utils/createDBObject");

// auth
const { genSalt, genHash } = require("../auth/hash");
const genToken = require("../auth/token");

// query
const findOne = require("../db/query/findOne");

// schema
const users = require("../db/schema/users");
const vfyEmail = require("../db/schema/vfyEmail");

// utils
const sendEmail = require("../auth/sendEmail");

const registerUser = async (req, res) => {
  const { id, email, password, firstname, lastname } = req.body;
  try {
    const user = await findOne(users, { $or: [{ id: id }, { email: email }] });
    console.log("User", user);
    if (user) {
      if (!user.verifiedbyuser) {
        const notVerifiedUser = await findOne(vfyEmail, {
          id: id,
          email: email,
        });
        console.log("Pending User", notVerifiedUser);
        sendEmail(
          notVerifiedUser.email,
          "BMM Verify Your Account",
          `${domain}/vfyEmail?token=${notVerifiedUser.token}`
        );
        res.json({ pending: "Verification is pending link is send again." });
        return;
      } else {
        res.json({ exist: "User already exist" });
      }
    } else {
      const salt = await genSalt();
      console.log("salt: ", salt);
      const hash = await genHash(salt, password);
      console.log("hash: ", hash);
      const token = await genToken({ id: id });
      console.log("Token: ", token);

      const tokenToDB = await createDBObject(vfyEmail, {
        id,
        email,
        token,
        timestamp: new Date(),
      });
      console.log("Token to DB", tokenToDB);
      tokenToDB
        .save()
        .then(() => {
          console.log("token saved");
        })
        .catch((err) => console.log(err));
      await sendEmail(
        email,
        "BMM Verify Your Account",
        `${domain}/vfyEmail?token=${token}`
      );
      
      // const {id, email, firstname, lastname} = req.body
      const obj = {id, email, firstname, lastname}
      const userToDB = await createDBObject(
        users,
        obj,
        {
          salt,
          hash,
          verifiedbyadmin: false,
          verifiedbyuser: false,
          joined: new Date(Date.now() + 330 * 60 * 1000).toISOString(),
        }
      );

      userToDB
        .save()
        .then((data) => {
          console.log("Data:", data);
          res.json({ send: "Verification email is send to your E-mail" });
        })
        .catch((err) => {
          console.log(err)
          console.log("Error occured saving user");
          res.json({ send: "Error occured saving user" });
        });
    }
  } catch (err) {
    res.send(err);
  }
};

const registrationForm = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../static", "register.html"));
};

module.exports = { registerUser, registrationForm };
