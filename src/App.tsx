import React from 'react';
import {
  AuthForm,
  AuthWrapper,
  LandingPage,
  MCLandingPage,
  AccountOpeningForm,
  BusinessProfileForm,
  DocumentsUBOForm,
  InternetBankingForm,
  ApprovalMatrixForm,
  EntityTaxResidencyForm,
} from './components/index'; // use index barrel if possible

import { useScreenNavigation } from './hooks/useScreenNavigation';

function App() {
  const { screen, goTo } = useScreenNavigation();

  const renderScreen = () => {
    switch (screen) {
      case 'auth':
        return <AuthForm onLoginSuccess={(type) => goTo(type === 'management' ? 'mc-landing' : 'landing')} />;
      case 'landing':
        return <LandingPage onApplyOnline={() => goTo('form')} />;
      case 'mc-landing':
        return <MCLandingPage onApplyOnline={() => goTo('form')} />;
      case 'form':
        return <AccountOpeningForm onNext={() => goTo('business-profile')} onBack={() => goTo('landing')} />;
      case 'business-profile':
        return <BusinessProfileForm onNext={() => goTo('documents-ubo')} onBack={() => goTo('form')} />;
      case 'documents-ubo':
        return <DocumentsUBOForm onNext={() => goTo('internet-banking')} onBack={() => goTo('business-profile')} />;
      case 'internet-banking':
        return <InternetBankingForm onNext={() => goTo('approval-matrix')} onBack={() => goTo('documents-ubo')} />;
      case 'approval-matrix':
        return <ApprovalMatrixForm onNext={() => goTo('entity-tax-residency')} onBack={() => goTo('internet-banking')} />;
      case 'entity-tax-residency':
        return <EntityTaxResidencyForm onBack={() => goTo('approval-matrix')} />;
      default:
        return <div>🤷 Unknown screen</div>;
    }
  };

  return <AuthWrapper>{renderScreen()}</AuthWrapper>;
}

export default App;
