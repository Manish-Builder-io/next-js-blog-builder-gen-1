import React, { useState, ChangeEvent } from 'react';

interface ContactFormProps {
  emails: string; // Corrected prop name
  testInput: string;
  onChange: (emails: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ emails: defaultValue, testInput, onChange }) => { // Corrected prop name
  const [emails, setEmails] = useState<string>(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmails = e.target.value;
    const validEmails = validateEmails(inputEmails);

    // Check if the number of emails exceeds 6
    const emailList = validEmails.split(';').filter(email => email.trim() !== '');
    if (emailList.length > 6) {
      alert('Maximum items is 6. Delete items to continue.');
      return;
    }

    setEmails(validEmails);

    // Call the provided onChange function
    onChange(validEmails);
  };

  const validateEmails = (input: string): string => {
    // Split emails by semicolon
    const emailList = input.split(';');
    const validatedEmails: string[] = [];

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Iterate over each email and validate
    emailList.forEach(email => {
      if (email.trim() !== '' && emailRegex.test(email.trim())) {
        validatedEmails.push(email.trim());
      }
    });

    // Join validated emails with semicolon
    return validatedEmails.join(';');
  };

  return (
    <div>
      <label htmlFor="emails">Emails:</label>
      <input
        type="text"
        id="emails"
        name="emails"
        value={emails}
        onChange={handleChange}
      />
      <p style={{ color: 'red', fontSize: '0.8em' }}>
        Emails must be in xx@xx.xx format, separated by semicolon.
      </p>
    </div>
  );
};

export default ContactForm;
