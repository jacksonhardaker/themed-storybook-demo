import { addParameters } from '@storybook/react'; // <- or your storybook framework

addParameters({
  themes: [
    { name: 'One', class: 'one', color: '#add8e6', default: true },
    { name: 'Two', class: 'two', color: '#f08080' },
  ],
});