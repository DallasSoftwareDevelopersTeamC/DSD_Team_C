import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SettingsContent from '../components/Settings/SettingsContent.jsx';

function SettingsPage() {
  return (
    <div>
      <Header />
      <SettingsContent />
      <Footer />
    </div>
  );
}

export default SettingsPage;