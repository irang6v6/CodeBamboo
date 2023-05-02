export function providerValidator(provider:string) : Boolean {
  const providers = ['kakao', 'naver', 'github'];
  return providers.includes(provider)
}