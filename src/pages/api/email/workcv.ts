import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle FormData
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(400).json({ message: "Failed to parse form data" });
    }

    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const message = Array.isArray(fields.message) ? fields.message[0] : fields.message;
    const agreements = Array.isArray(fields.agreements) ? fields.agreements[0] : fields.agreements;
    const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone;
    const position = Array.isArray(fields.position) ? fields.position[0] : fields.position;
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || typeof file !== "object" || !("filepath" in file)) {
      console.error("File upload is invalid or missing.");
      return res.status(400).json({ message: "File upload is invalid or missing." });
    }

    if (!name || !email || !message || !agreements || !phone || !position) {
      return res.status(400).json({ message: "All fields are required, including the file" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_RECEIVER,
        subject: `Nowa aplikacja na stanowisko ${position} od ${name}`,
        text: message,
        html: `<p><strong>Imię i nazwisko:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Telefon:</strong> ${phone}</p>
               <p><strong>Na stanowisko:</strong> ${position}</p>
               <p><strong>Wiadomość:</strong></p>
               <p>${message}</p>`,
        attachments: [
          {
            filename: file.originalFilename || "attachment",
            path: file.filepath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  });
}
