"use server";

import nodemailer from "nodemailer";

export async function createContact(formData: {
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
}) {
  try {
    const typeMap: Record<string, string> = {
      COLLABORATION: "협업 제안",
      "JOB INQUIRY": "채용 문의",
      "DEVELOPMENT REQUEST": "개발 의뢰",
      OTHER: "기타",
    };

    const readableType = typeMap[formData.type] ?? formData.type;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${formData.name}" <${formData.email}>`,
      replyTo: formData.email,
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
      subject: `[문의] ${readableType}`,
      text: `
    성함/회사: ${formData.name}
    이메일: ${formData.email}
    연락처: ${formData.phone ?? "NULL"}
    문의 종류: ${readableType}
    내용: ${formData.message}
  `,
      html: `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
      <h2 style="margin-bottom: 10px;">새 문의가 도착했습니다</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 120px;">성함/회사</td>
          <td style="padding: 8px;">${formData.name}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold;">이메일</td>
          <td style="padding: 8px;">${formData.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">연락처</td>
          <td style="padding: 8px;">${formData.phone ?? "NULL"}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold;">문의 종류</td>
          <td style="padding: 8px;">${readableType}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">내용</td>
          <td style="padding: 8px; white-space: pre-line;">${
            formData.message
          }</td>
        </tr>
      </table>
    </div>
  `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Send Failed!", error);
    return { success: false };
  }
}
