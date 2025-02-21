'use client'
import React, { useState } from 'react';
import styles from './page.module.css';

function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.target);
    const data = new URLSearchParams(formData);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      window.location.href = '/thank-you';
    } catch (error) {
      setSubmitError('There was an error with your submission. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className={styles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className={styles.inputField}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className={styles.textarea}
        ></textarea>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Send Message'}
        </button>
      </form>

      {submitError && <p>{submitError}</p>}
    </div>
  );
}

export default Page;
