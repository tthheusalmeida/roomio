import dateHelper from "@/libs/dateHelper";
import { CfeStateCode } from "@/services/cfes";

const urls = [
  "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p=",
  "https://www.nfce.fazenda.sp.gov.br/qrcode?p=",
];

const validateKey = (key: string) => {
  const regex = /^[0-9]{44}$/; // 44 digits for NFC-e key
  const stateCode = parseInt(key.slice(0, 2));
  const isValidState = CfeStateCode[stateCode];

  return !!(regex.test(key) && isValidState);
};

export const isValidCfeKey = (qrCodeData: string): boolean => {
  const { key } = getParams(qrCodeData);
  return validateKey(key);
};

export const normalizeCfeKey = (key: string): string => {
  return key.replace("CFe", "");
};

const paramsWithUrl = (data: string, url: string) => {
  const [key] = data.replace(url, "").split("|");

  return {
    key: normalizeCfeKey(key),
    signature: data,
  };
};

export const getParams = (
  qrCodeData: string,
): {
  key: string;
  signature?: string;
  value?: number;
  emittedAt?: Date;
} => {
  const url = urls.find((u) => qrCodeData.includes(u));

  if (url) {
    return paramsWithUrl(qrCodeData, url);
  }

  const [key, emittedAt, value, , signature] = qrCodeData.split("|");

  return {
    key: normalizeCfeKey(key),
    signature,
    value: value ? parseFloat(value) : undefined,
    emittedAt: emittedAt
      ? dateHelper.utc(emittedAt, "YYYYMMDDHmmss").toDate()
      : undefined,
  };
};
