export const formatCurrencyBRL = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const maskName = (fullName: string): string => {
  const [firstName = "", ...rest] = fullName.trim().split(" ");
  if (rest.length === 0) {
    return `${firstName} *`.trim();
  }
  const last = rest.join(" ");
  return `${firstName} ${last.charAt(0)}***`;
};
