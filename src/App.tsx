import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import AuthWrapper from './components/AuthWrapper';
import LandingPage from './components/LandingPage';
import AccountOpeningForm from './components/AccountOpeningForm';
import BusinessProfileForm from './components/BusinessProfileForm';
import DocumentsUBOForm from './components/DocumentsUBOForm';
import InternetBankingForm from './components/InternetBankingForm';
import ApprovalMatrixForm from './components/ApprovalMatrixForm';
import EntityTaxResidencyForm from './components/EntityTaxResidencyForm';
import MCLandingPage from './components/MCLandingPage';

type Screen =
  | 'auth'
  | 'landing'
  | 'mc-landing'
  | 'form'
  | 'business-profile'
  | 'documents-ubo'
  | 'internet-banking'
  | 'approval-matrix'
  | 'entity-tax-residency'
  

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');

  const handleLoginSuccess = (userType: string) => {
    if (userType === 'management') {
      setCurrentScreen('mc-landing');
    } else {
      setCurrentScreen('landing');
    }
  };

  const handleApplyOnline = () => {
    setCurrentScreen('form');
  };

  const handleNextToBusinessProfile = () => {
    setCurrentScreen('business-profile');
  };

  const handleNextToDocumentsUBO = () => {
    setCurrentScreen('documents-ubo');
  };

  const handleNextToInternetBanking = () => {
    setCurrentScreen('internet-banking');
  };

  const handleNextToApprovalMatrix = () => {
    setCurrentScreen('approval-matrix');
  };

  const handleBackToForm = () => {
    setCurrentScreen('form');
  };

  const handleBackToBusinessProfile = () => {
    setCurrentScreen('business-profile');
  };

  const handleBackToDocumentsUBO = () => {
    setCurrentScreen('documents-ubo');
  };

  const handleBackToInternetBanking = () => {
    setCurrentScreen('internet-banking');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  const handleNextToEntityTaxResidency = () => {
    setCurrentScreen('entity-tax-residency');
  };

  const handleBackToApprovalMatrixFromEntityTaxResidency = () => {
    setCurrentScreen('approval-matrix');
  };

   

  return (
    <AuthWrapper>
      {currentScreen === 'auth' && (
        <AuthForm onLoginSuccess={(userType) => handleLoginSuccess(userType)} />
      )}

      {currentScreen === 'landing' && (
        <LandingPage
          onApplyOnline={handleApplyOnline}
          
        />
      )}

      {currentScreen === 'mc-landing' && (
        <MCLandingPage onApplyOnline={handleApplyOnline} />
      )}

      {currentScreen === 'form' && (
        <AccountOpeningForm
          onNext={handleNextToBusinessProfile}
          onBack={handleBackToLanding}
        />
      )}

      {currentScreen === 'business-profile' && (
        <BusinessProfileForm
          onNext={handleNextToDocumentsUBO}
          onBack={handleBackToForm}
        />
      )}

      {currentScreen === 'documents-ubo' && (
        <DocumentsUBOForm
          onNext={handleNextToInternetBanking}
          onBack={handleBackToBusinessProfile}
        />
      )}

      {currentScreen === 'internet-banking' && (
        <InternetBankingForm
          onNext={handleNextToApprovalMatrix}
          onBack={handleBackToDocumentsUBO}
        />
      )}

      {currentScreen === 'approval-matrix' && (
        <ApprovalMatrixForm
          onNext={handleNextToEntityTaxResidency}
          onBack={handleBackToInternetBanking}
        />
      )}

      {currentScreen === 'entity-tax-residency' && (
        <EntityTaxResidencyForm
          onBack={handleBackToApprovalMatrixFromEntityTaxResidency}
        />
      )}

    </AuthWrapper>
  );
}

export default App;
