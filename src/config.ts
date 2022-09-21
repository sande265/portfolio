import { hex2rgba } from './helpers';

declare interface ConfigOptions {
  baseUrl: string | undefined;
}

export const Config: ConfigOptions = {
  baseUrl: process.env.REACT_APP_BASE_URL
}

export const menus = [
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#jobs' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
];

export const links = [
  { name: 'Instagram', link: 'https://www.instagram.com/__sande265/' },
  { name: 'Twitter', link: 'https://twitter.com/sande265/' },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/sande265/' },
  { name: 'GitHub', link: 'https://github.com/sande265/' },
];

export const colors = {
  green: hex2rgba('#64ffda'),
  navy: hex2rgba('#0a192f'),
  darkNavy: hex2rgba('#020c1b'),
};

export const firebaseConfig = {
  apiKey: 'AIzaSyDtolBgtVYyHUHl0yfC7N611U2GSZMGMzA',
  authDomain: 'portfolio-e7929.firebaseapp.com',
  projectId: 'portfolio-e7929',
  storageBucket: 'portfolio-e7929.appspot.com',
  messagingSenderId: '141130755383',
  appId: '1:141130755383:web:ef6ee5950bfe1a0bf5beb2',
  measurementId: 'G-J4E7KKM8TH',
};
