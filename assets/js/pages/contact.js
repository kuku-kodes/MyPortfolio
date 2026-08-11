import { initCommonLayout, finalizeReveal } from '../main.js';
import { EMAILJS } from '../../../config/constants.js';

const profile = await initCommonLayout((p) => ({
  path: '/contact.html',
  title: `Contact — ${p.personal.name}`,
  description: `Get in touch with ${p.personal.name}.`
}));

document.getElementById('contact-intro').textContent =
  `Have a role, project, or question in mind? Send a message and I'll get back to you.`;
document.getElementById('contact-email').textContent = profile.personal.email;
document.getElementById('contact-email').href = `mailto:${profile.personal.email}`;
document.getElementById('contact-location').textContent = `Location: ${profile.personal.location}`;

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot: if this hidden field got filled in, silently drop the submission.
  if (form.company.value) return;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  status.textContent = '';
  status.className = 'text-sm';

  const configured =
    EMAILJS.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
    EMAILJS.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
    EMAILJS.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

  if (!configured) {
    status.textContent =
      'Contact form is not configured yet — add your EmailJS IDs in config/constants.js. See README > "Contact form setup".';
    status.classList.add('text-amber-600', 'dark:text-amber-400');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
    return;
  }

  try {
    const emailjs = (await import('@emailjs/browser')).default;
    await emailjs.send(
      EMAILJS.serviceId,
      EMAILJS.templateId,
      {
        from_name: form.name.value,
        reply_to: form.email.value,
        message: form.message.value
      },
      { publicKey: EMAILJS.publicKey }
    );
    status.textContent = 'Thanks — your message has been sent!';
    status.classList.add('text-emerald-600', 'dark:text-emerald-400');
    form.reset();
  } catch (err) {
    status.textContent = 'Something went wrong sending your message. Please try emailing directly instead.';
    status.classList.add('text-red-600', 'dark:text-red-400');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  }
});

finalizeReveal();
