import nextConnect from "next-connect";   //
import multer from "multer";
import path from "path";
import fs from "fs";
import { initDB } from "../../lib/db";

const uploadDir = path.join(process.cwd(), "/public/schoolImages");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("API Error:", error);
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

export const config = {
  api: { bodyParser: false },
};

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;

    let imagePath = null;
    if (req.file) {
      imagePath = `/schoolImages/${req.file.filename}`;
    }

    const pool = initDB();
    const [result] = await pool.execute(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?,?,?,?,?,?,?)`,
      [name, address, city, state, contact, imagePath, email_id]
    );

    res.status(200).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default apiRoute;
