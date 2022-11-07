const User = require("../models/user-model");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const CryptoAlgorithm = "aes-256-cbc";

// Obviously keys should not be kept in code, these should be populated with environmental variables or key store
const secret = {
  iv: Buffer.from("efb2da92cff888c9c295dc4ee682789c", "hex"),
  key: Buffer.from(
    "6245cb9b8dab1c1630bb3283063f963574d612ca6ec60bc8a5d1e07ddd3f7c53",
    "hex"
  ),
};

function encrypt(algorithm, buffer, key, iv) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return encrypted;
}

function decrypt(algorithm, buffer, key, iv) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
  return decrypted;
}

function getEncryptedFilePath(filePath) {
  return path.join(
    path.dirname(filePath),
    path.basename(filePath, path.extname(filePath)) +
      `_${new Date().getTime()}` +
      "_encrypted" +
      path.extname(filePath)
  );
}

async function saveEncryptedFile(buffer, filePath, userID, key, iv) {
  const encrypted = encrypt(CryptoAlgorithm, buffer, key, iv);

  filePath = getEncryptedFilePath(filePath);
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath));
  }

  fs.writeFileSync(filePath, encrypted);
  const user = await User.findById(userID);
  try {
    await user.updateOne({ $push: { messages: [{ file_paths: filePath }] } });
  } catch (err) {
    console.log(err);
  }
}

function getEncryptedFile(filePath, key, iv) {
  filePath = getEncryptedFilePath(filePath);
  const encrypted = fs.readFileSync(filePath);
  const buffer = decrypt(CryptoAlgorithm, encrypted, key, iv);
  return buffer;
}

const fileUpload = async (req, res, next) => {
  saveEncryptedFile(
    req.file.buffer,
    path.join("./uploads", req.file.originalname),
    req.body.userId,
    secret.key,
    secret.iv
  );

  res.status(201).json({ status: "File uploaded, successfully" });
  (error, req, res) => {
    if (error) {
      res.status(500).send(error.message);
    }
  };
};

exports.fileUpload = fileUpload;
