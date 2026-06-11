# Murastone Website

A single-page marketing site for Murastone, a flexible soft stone panel distributor. Content and product images are sourced from the Magic Stone 2024 product brochure. Includes product showcase, full catalog listing, gallery, and a contact request form.

## View locally

Open `index.html` in your browser, or run a simple server:

```powershell
cd C:\Users\wendy\murastone-website
python -m http.server 8080
```

Then visit http://localhost:8080

## Connect the contact form

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form and copy your form ID
3. In `index.html`, replace `YOUR_FORM_ID` in the form action URL:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

Submissions will be emailed to you automatically.

## Add your brochure images

Save your PDF to:

```
assets/brochure/murastone-brochure.pdf
```

Then tell the agent to extract images and update the site copy from the brochure (English only, no Chinese text).

## Customize contact details

Update the email, phone, and business hours in the contact section of `index.html`.
