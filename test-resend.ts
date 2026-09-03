import { Resend } from "resend";
const resend = new Resend('re_123456789');
async function run() {
  const response = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "test@example.com",
    subject: "Test",
    html: "test"
  });
  console.log(response);
}
run();
