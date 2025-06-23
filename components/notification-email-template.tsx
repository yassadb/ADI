import * as React from 'react';

interface NotificationEmailTemplateProps {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export const NotificationEmailTemplate: React.FC<Readonly<NotificationEmailTemplateProps>> = ({
  fullName,
  email,
  company,
  phone,
  subject,
  message,
}) => (
  <div>
    <h1>Nouvelle soumission du formulaire de contact</h1>
    <p><strong>Nom complet:</strong> {fullName}</p>
    <p><strong>Email:</strong> {email}</p>
    {company && <p><strong>Société:</strong> {company}</p>}
    {phone && <p><strong>Téléphone:</strong> {phone}</p>}
    <p><strong>Sujet:</strong> {subject}</p>
    <p><strong>Message:</strong></p>
    <p>{message}</p>
  </div>
);
