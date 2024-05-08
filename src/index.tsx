import './style.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.body;
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<div>Hello, React!!</div>);
