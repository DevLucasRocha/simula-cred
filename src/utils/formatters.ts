// Formatar valor numérico para moeda brasileira (Real)
export const formatCurrencyBRL = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

// Mascarar nome completo exibindo apenas primeira letra do sobrenome
export const maskName = (fullName: string): string => {
  const [firstName = "", ...rest] = fullName.trim().split(" ");
  if (rest.length === 0) {
    return `${firstName} *`.trim();
  }
  const last = rest.join(" ");
  return `${firstName} ${last.charAt(0)}***`;
};
