import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRegion } from '../contexts/RegionContext';

export const ProfessionalFooter: React.FC = () => {
  const { t, language } = useLanguage();
  const { currentData, activeRegion } = useRegion();

  return (
    <footer className="professional-footer">
      {/* Debug banner */}
      <div className="debug-banner">
        Debug: Footer mounted. Region = {activeRegion}, Language = {language}
      </div>

      <section>
        <h4>{t('footer.methodologyTitle')}</h4>
        <p>{t('footer.methodologyDescription')}</p>
        <ul>
          <li>{t('footer.methodATJ')}</li>
          <li>{t('footer.methodAgreste')}</li>
          <li>{t('footer.methodIFV')}</li>
          <li>{t('footer.methodCORSIA')}</li>
        </ul>
      </section>

      <section>
        <h4>{t('footer.certificationsTitle')}</h4>
        <ul>
          <li>{t('footer.certBureauVeritas')}</li>
          <li>{t('footer.certASTM')}</li>
          <li>{t('footer.certCORSIA')}</li>
          <li>{t('footer.certQuarterly')}</li>
          <li>{t('footer.certPeerReviewed')}</li>
        </ul>
      </section>

      <section>
        <h4>{t('footer.institutionalPartners')}</h4>
        <ul>
          <li>{t('partners.region', { region: currentData.name })}</li>
          <li>{t('partners.ifv')}</li>
          <li>{t('partners.safer')}</li>
          <li>{t('partners.chamber')}</li>
          <li>{t('partners.union')}</li>
        </ul>
      </section>

      <section>
        <h4>{t('footer.dataSources')}</h4>
        <ul>
          <li>{t('footer.dataAgreste')}</li>
          <li>{t('footer.dataIFV')}</li>
          <li>{t('footer.dataOIV')}</li>
          <li>{t('footer.dataFuelMarket')}</li>
        </ul>
      </section>

      <section>
        <h4>{t('footer.scientificValidation')}</h4>
        <ul>
          <li>{t('footer.validationPeer')}</li>
          <li>{t('footer.validationBureau')}</li>
          <li>{t('footer.validationISO')}</li>
          <li>{t('footer.validationCarbon')}</li>
        </ul>
      </section>

      <section>
        <h4>{t('footer.internationalStandards')}</h4>
        <ul>
          <li>{t('footer.standardASTM')}</li>
          <li>{t('footer.standardCORSIA')}</li>
          <li>{t('footer.standardRED')}</li>
          <li>{t('footer.standardISCC')}</li>
        </ul>
      </section>

      <section className="copyright">
        <p>© 2025 {t('footer.copyright')}</p>
        <p>{t('footer.dataUpdate')}</p>
        <p>{t('footer.legalNotices')}</p>
      </section>
    </footer>
  );
};
