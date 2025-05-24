interface OTPInfo {
  code: number;
  expirationCode: Date;
}

export function OTPCode(): OTPInfo {
  const CodeOTP = Math.floor(100000 + Math.random() * 900000) // Random code of 6 numbers;
  const expirationCode = new Date(Date.now() + 900000); // 15 minutes ;

  return { CodeOTP, expirationCode };
}
