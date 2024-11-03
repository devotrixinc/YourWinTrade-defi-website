import { Row, Col } from 'antd';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { AiOutlineKey } from 'react-icons/ai';
import WalletResetPasswordModal from "../component/WalletResetPasswordModal";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { SERVER_URL } from "../../constants/env";

function WalletProfile() {
  const [t, i18n] = useTranslation();
  const [use, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showModal, setShowModal] = useState(false);
  const [prices, setPrices] = useState({ ETH: null, BNB: null });

  // Using useCallback to memoize the fetchPrices function
  const fetchPrices = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}wallets/crypto-prices`);
      setPrices(response.data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]); // Depend on fetchPrices to avoid stale closure issues

  // Using useMemo to derive memoized values for display
  const ethPrice = useMemo(() => prices.ETH, [prices.ETH]);
  const bnbPrice = useMemo(() => prices.BNB, [prices.BNB]);

  return (
    <Col span={22} offset={1} className="mt-8 myColor1 text-sm">
      <Row>
        <Col span={20}>
          {t('Email Address')} 
        </Col>
        <Col span={4} className="text-center text-overflow">
          {t('Edit Password')}
        </Col>
      </Row>

      <Row className="text-lg font-bold">
        <Col span={20}>
          {t(use.email)}
        </Col>
        <Col span={4} className="text-center">
          <a onClick={() => setShowModal(true)}>
            <AiOutlineKey size={20} className="inline mr-2" />
          </a>
        </Col>
      </Row>

      <Row>
        <Col span={20}>
          {t('User Name')} 
        </Col>
        <Col span={4} className="text-center text-overflow">
        </Col>
      </Row>

      <Row className="text-lg font-bold">
        <Col span={20}>
          {t(use.name)}
        </Col>
        <Col span={4} className="text-center">
        </Col>
      </Row>

      {/* Crypto Market Price Section */}
      <Row>
        <Col span={20}>
          {t('Crypto Market Price')}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col span={20}>
          <p>{t('ETH Price')}: ${ethPrice !== null ? ethPrice : t('Loading...')}</p>
          <p>{t('BNB Price')}: ${bnbPrice !== null ? bnbPrice : t('Loading...')}</p>
        </Col>
      </Row>

      {showModal && (
        <WalletResetPasswordModal setModalShow={setShowModal} title="Reset Password" />
      )}
    </Col>
  );
}

export default WalletProfile;
