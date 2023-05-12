export function providerValidator(provider: string): boolean {
  const providers = ['kakao', 'naver', 'github'];
  return providers.includes(provider);
}
