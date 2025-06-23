import * as React from 'react';

interface ConfirmationEmailTemplateProps {
  fullName: string;
}

export const ConfirmationEmailTemplate: React.FC<Readonly<ConfirmationEmailTemplateProps>> = ({
  fullName,
}) => (
  <div>
    <h1>Merci de nous avoir contactés, {fullName} !</h1>
    <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
    <p>Cordialement,</p>
    <p>L'équipe d'Atlas Digital Impact</p>
  </div>
);
