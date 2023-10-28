/**
 * plugins/webfontloader.ts
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: [
        'Noto Sans JP',
        'Noto Sans SC',
        'Noto Sans TC',
        'Noto Sans KR',
        'Roboto:100,300,400,500,700,900&display=swap'
      ],
    },
  })
}
