import './style.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import RegisterPage from './componets/registration_form/registration_form.render';

const container = document.body;
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<RegisterPage />);
