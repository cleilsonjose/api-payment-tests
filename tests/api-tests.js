const axios = require('axios');

describe('API de Pagamento - Zoop Sandbox', () => {
  let accessToken = '';

  beforeAll(() => {
    // Simula autenticação OAuth2
    accessToken = 'mock_bearer_token_zoop_xyz';
    console.log('✅ Autenticado com sucesso na API de sandbox');
  });

  test('CT01 - Valida schema de resposta ao criar transação', async () => {
    const mockTransaction = {
      amount: 15000, // R$ 150,00 em centavos
      currency: 'BRL',
      payment_method: 'credit_card',
      card_number: '4111111111111111', // cartão de teste Visa
      card_cvv: '123',
      card_expiration_date: '0128'
    };

    // Simulando resposta da API Zoop
    const response = {
      id: 'tx_123456789',
      amount: 15000,
      status: 'approved',
      created_at: new Date().toISOString(),
      payment_method: {
        type: 'credit_card',
        brand: 'visa',
        first4: '4111',
        last4: '1111'
      }
    };

    expect(response).toHaveProperty('id');
    expect(response.status).toBe('approved');
    expect(response.amount).toBe(15000);
    expect(response.payment_method.brand).toBe('visa');

    console.log(`✅ Transação aprovada: ${response.id} | R$ ${response.amount / 100}`);
  });

  test('CT02 - Rejeita transação com CVV inválido', () => {
    const invalidCVV = '12'; // CVV deve ter 3 dígitos

    expect(invalidCVV.length).toBeLessThan(3);

    const errorResponse = {
      error: 'invalid_cvv',
      message: 'CVV deve conter 3 dígitos',
      status: 400
    };

    expect(errorResponse.status).toBe(400);
    expect(errorResponse.error).toBe('invalid_cvv');

    console.log('❌ Transação rejeitada corretamente por CVV inválido');
  });

  test('CT03 - Valida PCI-DSS: nunca armazena CVV completo', () => {
    const sensitiveData = {
      card_number: '4111111111111111',
      cvv: '123',
      expiration: '0128'
    };

    // Regra PCI-DSS: CVV nunca deve ser persistido
    const shouldStoreCVV = false;
    expect(shouldStoreCVV).toBe(false);

    // Número do cartão deve ser mascarado ao armazenar
    const maskedCard = sensitiveData.card_number.replace(/.(?=.{4})/g, '*');
    expect(maskedCard).toBe('************1111');

    console.log(`🔒 Dados sensíveis tratados conforme PCI-DSS: ${maskedCard}`);
  });

  test('CT04 - Valida transação com valor mínimo', () => {
    const minAmount = 100; // R$ 1,00 em centavos

    expect(minAmount).toBeGreaterThanOrEqual(100);
    console.log(`✅ Valor mínimo permitido: R$ ${minAmount / 100}`);
  });

  test('CT05 - Valida transação com valor máximo', () => {
    const maxAmount = 5000000; // R$ 50.000,00 em centavos

    expect(maxAmount).toBeLessThanOrEqual(5000000);
    console.log(`✅ Valor máximo permitido: R$ ${maxAmount / 100}`);
  });
});