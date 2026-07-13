export const CONTACT_EMAIL = "somnathkhadanga@gmail.com";
export const WHATSAPP_NUMBER = "917008257342";
export const LINKEDIN_URL = "https://www.linkedin.com/in/somnath-khadanga/";
export const GITHUB_URL = "https://github.com/somnathraz";
export const WORKING_TIMEZONE = "IST (Asia/Kolkata)";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const MVP_WHATSAPP_MESSAGE =
  "Hi Somanath — I found your SaaS MVP Development page and want to discuss a project.";
