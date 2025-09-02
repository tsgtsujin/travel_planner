// // Mail config
// // const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //       user: process.env.EMAIL_USER,
// //       pass: process.env.EMAIL_PASS,
// //     },
// //   });

// // Токен DB-д хадгалах загвар (шинээр models/ResetToken.js гэх мэт файл үүсгэж болно)
// const ResetTokenModel = require("./models/ResetToken"); // Шинээр үүсгэнэ

// // Protected route (Forgot Password)
// app.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await UsersModel.findOne({ email });
//         if (!user) return res.status(404).json("Хэрэглэгч олдсонгүй!");
//         // Токен үүсгэх
//         const token = crypto.randomBytes(32).toString("hex");
//         user.resetToken = token;
//         user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 минутын хугацаа
//         await user.save();
//         // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

//         // Хуучин токен байвал устгах
//         // await ResetTokenModel.deleteMany({ email });
//         // Токеныг хадгалах (10 минут хүчинтэй)
//         // const expireAt = Date.now() + 10 * 60 * 1000;
//         // await ResetTokenModel.create({ email, token, expireAt });

//         // Имэйл илгээх (nodemailer ашиглана)
//         // const transporter = nodemailer.createTransport({
//         //     service: "gmail",
//         //     auth: {
//         //         user: "YOUR_EMAIL@gmail.com",
//         //         pass: "YOUR_APP_PASSWORD", // Gmail App Password ашиглах шаардлагатай
//         //     },
//         // });

//         // Reset холбоосын URL
//     const resetUrl = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
//         // const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
//         // const resetLink = `http://localhost:3000/reset-password/${token}`;
//         // await transporter.sendMail({
//         //     from: process.env.EMAIL_USER,
//         //     to: email,
//         //     subject: "Нууц үг сэргээх холбоос",
//         //     html: `<p>Нууц үгээ сэргээхийн тулд доорх холбоос дээр дарна уу:</p>
//         //            <a href="${resetLink}">${resetLink}</a>`,
//         // });
//         // И-мэйлээр илгээх
//     await sendEmail(
//         email,
//         "Нууц үг сэргээх",
//         `<p>Нууц үгээ шинэчлэхийн тулд дараах холбоос дээр дарна уу!:</p><a href="${resetUrl}">${resetUrl}</a>`
//       );
//         res.json("Нууц үг сэргээх холбоос амжилттай илгээгдлээ!");
//     } catch (err) {
//         console.error(err);
//         res.status(500).json("Error while sending reset email");
//     }
// });

// // Reset password
// // app.post("/reset-password", async (req, res) => {
// //     const { email, token, newPassword } = req.body;
// //     try {
// //         const resetRecord = await ResetTokenModel.findOne({ email, token });
// //         if (!resetRecord || resetRecord.expireAt < Date.now()) {
// //             return res.status(400).json("Invalid or expired token");
// //         }
// //         const user = await UsersModel.findOne({ email });
// //         if (!user) return res.status(404).json("User not found");
// //         user.password = await bcrypt.hash(newPassword, 10);
// //         await user.save();
// //         // Token устгах
// //         await ResetTokenModel.deleteMany({ email });
// //         res.json("Password reset successfully");
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json("Error while resetting password");
// //     }
// // });
// app.post("/reset-password/:token", async (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       await UsersModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });
//       res.json("Нууц үг амжилттай шинэчлэгдлээ!");
//     } catch (err) {
//       console.error(err);
//       res.status(400).json("Invalid or expired token");
//     }
//   });

// import multer from "multer";
// import path from "path";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersModel = require("./models/Users");
const ProvinceModel = require("./models/Province");
const ActivitiesModel = require("./models/Activities");
const TripsModel = require("./models/Trips");
const app = express();
// const authMiddleware = require("./middleware/authMiddleware"); // JWT шалгах middleware

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/trip_planner");

const JWT_SECRET = "your_secret_key";

// REGISTER
app.post("/register", async (req, res) => {
    const { name, phone, email, password } = req.body;
    try {
        // Хэрэглэгч бүртгэлтэй эсэхийг шалгах
        const existingUser = await UsersModel.findOne({ email });
        if (existingUser) return res.status(400).json("Бүртгэлтэй хэрэглэгч!");
        // Нууц үгийг хэшлэх
        const hashedPassword = await bcrypt.hash(password, 10);
        // Хэрэглэгчийн бүртгэлийг хадгалах
        const user = await UsersModel.create({ name, phone, email, password: hashedPassword });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CHECK-EMAIL
app.get("/check-email/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const user = await UsersModel.findOne({ email });
        res.json({ exists: !!user });
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
app.post("/login", async (req, res) => {
    const { email, password, phone, name } = req.body;
    try {
        // Хэрэглэгч бүртгэлтэй эсэхийг шалгах
        const user = await UsersModel.findOne({ email });
        console.log("Олдсон хэрэглэгч:", user);
        if (!user) return res.status(404).json("Бүртгэлтэй хэрэглэгч олдсонгүй!");
        // Хэрэглэгчийн оруулсан password-ийг, өгөгдлийн санд хадгалагдсан хэшлэгдсэн утгатай харьцуулах
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // Нууц үг буруу байвал
        if (!isPasswordValid) return res.status(401).json("Нууц үг буруу байна!");
        // Нууц үг зөв байвал токен үүснэ.
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ message: "Амжилттай", token,
            email: user.email,
            name: user.name,
            phone: user.phone,
         });
    } catch (err) {
        res.status(500).json(err);
    }
});

// CHANGE-PASSWORD 
app.post("/changepass", async (req, res) => {
    const { email, newpassword } = req.body;
    try {
        const user = await UsersModel.findOne({ email });
        if (!user) return res.status(404).json("Хэрэглэгчийн хаяг олдсонгүй!");
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json("Нууц үг амжилттай шинэчлэгдлээ!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json("Access denied");
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json("Invalid token");
    }
};

// PROFILE 
app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await UsersModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json("Хэрэглэгч олдсонгүй!");
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// EDIT PROFILE
app.put("/edit-profile", authMiddleware, async (req, res) => {
  const { name, email, phone } = req.body
  const userId = req.user.id 
  if (!name && !email && !phone) {
    return res.status(400).json({ error: "Шинэчлэх мэдээлэл алга байна." })
  }
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      userId,
      { ...(name && { name }), ...(email && { email }), ...(phone && { phone }) },
      { new: true }
    )
    res.json({ user: updatedUser })
  } catch (err) {
    console.error("Профайл шинэчлэх үед алдаа:", err)
    res.status(500).json({ error: "Хадгалах үед алдаа гарлаа!" })
  }
})

// ALL PROVINCE
app.get("/province/all", async (req, res) => {
    try {
      const provinces = await ProvinceModel.find();
      res.status(200).json({ success: true, data: provinces });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
}); 

// SEARCH WITH PROVINCE NAME
app.get("/province/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const decodedName = decodeURIComponent(name);
    const province = await ProvinceModel.findOne({ name:  decodedName });
    if (!province) {
      return res.status(404).json({ success: false, message: "Аймаг олдсонгүй!" });
    }
    return res.status(200).json({ success: true, data: province });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ADD PROVINCE  
app.post("/province/add", async (req, res) => {
    try {
      const { name, size, center, sum, team, description, latitude, longitude, imageUrl } = req.body;
      const province = new ProvinceModel({
        name,
        size,
        center,
        sum,
        team,
        description,
        latitude,
        longitude,
        imageUrl,
      });
      const saved = await province.save();
      res.status(201).json({ success: true, data: saved });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
});

// SEARCH WITH PROVINCE ID
app.get("/activities/province/:provinceId", async (req, res) => {
  try {
    const { provinceId } = req.params;
    const activities = await ActivitiesModel.find({ province_id: provinceId });
    return res.status(200).json({ success: true, data: activities });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ADD ACTIVITIES
app.post("/activities/add", async (req, res) => {
    try {
      const { name, province_id, location, area, height, depth, length, width, level, mostDepth, water, year, timeTable, kidPayment, adultPayment, foreignPayment, photoPayment, videoPayment, description, latitude, longitude, imageUrl } = req.body;
      const activities = new ActivitiesModel({
        name,
        province_id,
        location,
        area,
        height,
        depth,
        length,
        width,
        level,
        mostDepth,
        water,
        year,
        timeTable,
        kidPayment,
        adultPayment,
        foreignPayment,
        photoPayment,
        videoPayment,
        description,
        latitude,
        longitude,
        imageUrl,
      });
      const saved = await activities.save();
      res.status(201).json({ success: true, data: saved });
    } catch (err) {
      console.error("Error creating activity:", error);
      res.status(400).json({ success: false, error: err.message });
    }
});

// SEARCH WITH ACTIVITIY ID
app.get("/activities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const activity = await ActivitiesModel.findById(id);
      if (!activity) {
        return res.status(404).json({ success: false, message: "Газар олдсонгүй!" });
      }
      return res.status(200).json({ success: true, data: activity });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
}); 

// ALL ACTIVITIES
app.get("/activities", async (req, res) => {
  try {
    const ids = req.query.ids;
    const list = Array.isArray(ids) ? ids : ids?.split(",");
    if (!list || list.length === 0) {
      return res.status(400).json({ success: false, message: "ids параметр шаардлагатай!" });
    }
    const activities = await ActivitiesModel.find({ _id: { $in: list } });
    res.json({ data: activities });
  } catch (error) {
    console.error("Газруудыг ID-аар татахад алдаа гарлаа:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/activities/all", async (req, res) => {
    try {
      const activities = await ActivitiesModel.find();
      res.status(200).json({ success: true, data: activities });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
}); 

// ADD TRIP
app.post("/trip/add", async (req, res) => {
  try {
    const { userEmail, provinceId, startDate, endDate, activitiesId } = req.body;
    if (!userEmail || !provinceId || !startDate || !endDate || !activitiesId) {
      return res.status(400).json({ message: "Бүх талбарыг бөглөнө үү!" });
    }
    const newTrip = new TripsModel({
      userEmail,
      provinceId,
      startDate,
      endDate,
      activitiesId,
    });
    await newTrip.save();
    res.status(201).json({ message: "Аялал амжилттай хадгалагдлаа!", trip: newTrip });
  } catch (error) {
    console.error("Аялал хадгалах үед алдаа:", error);
    res.status(500).json({ message: "Дотоод серверийн алдаа!" });
  }
});

// Хэрэглэгчийн бүх аяллыг авах
app.get("/trip/user/:email", async (req, res) => {
  try {
    const userTrips = await TripsModel.find({ userEmail: req.params.email })
      .populate("provinceId")
      .populate("activitiesId");

    res.status(200).json({ trips: userTrips });
  } catch (error) {
    console.error("Аяллуудыг авах үед алдаа:", error);
    res.status(500).json({ message: "Дотоод серверийн алдаа!" });
  }
});

app.get("/trip/:id", async (req, res) => {
  try {
    const trip = await TripsModel.findById(req.params.id)
      .populate("provinceId")
      .populate("activitiesId");

    if (!trip) {
      return res.status(404).json({ message: "Аялал олдсонгүй!" });
    }

    res.status(200).json({ trip });
  } catch (error) {
    console.error("Аяллыг авах үед алдаа гарлаа:", error);
    res.status(500).json({ message: "Дотоод серверийн алдаа!" });
  }
});

const port = 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});