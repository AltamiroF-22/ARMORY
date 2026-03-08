/* ============================================================
   data/ammo.js
   Simulates an ammo API response.
   Each round carries its own locale map for all translated
   fields (type, name, cal, vel, price). UI strings (section
   title, eyebrow, etc.) stay in js/locales/. Only product
   data lives here.

   Velocity is expressed in fps for EN/PT and m/s for DE/JP,
   reflecting the measuring conventions of each market.
   ============================================================ */

export const AMMO = [
  {
    id: "nato-556",
    grain: "62",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/58/5.56_x_45_mm_NATO.jpg",
    locales: {
      en: {
        type: "Rifle Cartridge",
        name: "M855A1 EPR",
        cal: "5.56×45mm NATO",
        vel: "3,025 fps",
        price: "$24.99 /20rd",
      },
      pt: {
        type: "Cartucho de Rifle",
        name: "M855A1 EPR",
        cal: "5.56×45mm NATO",
        vel: "922 m/s",
        price: "R$ 99,90 /20pc",
      },
      de: {
        type: "Gewehrpatrone",
        name: "M855A1 EPR",
        cal: "5,56×45mm NATO",
        vel: "922 m/s",
        price: "19,99 € /20 Stk.",
      },
      jp: {
        type: "ライフル弾",
        name: "M855A1 EPR",
        cal: "5.56×45mm NATO",
        vel: "922 m/s",
        price: "¥3,800 /20発",
      },
    },
  },
  {
    id: "9mm-subsonic",
    grain: "147",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/9_mm.JPG",
    locales: {
      en: {
        type: "Handgun",
        name: "9mm JHP Subsonic",
        cal: "9×19mm Parabellum",
        vel: "980 fps",
        price: "$29.99 /50rd",
      },
      pt: {
        type: "Pistola",
        name: "9mm JHP Subsônico",
        cal: "9×19mm Parabellum",
        vel: "299 m/s",
        price: "R$ 119,90 /50pc",
      },
      de: {
        type: "Kurzwaffenpatrone",
        name: "9mm JHP Subsonic",
        cal: "9×19mm Parabellum",
        vel: "299 m/s",
        price: "24,99 € /50 Stk.",
      },
      jp: {
        type: "ハンドガン弾",
        name: "9mm JHPサブソニック",
        cal: "9×19mm パラベラム",
        vel: "299 m/s",
        price: "¥5,800 /50発",
      },
    },
  },
  {
    id: "762-nato-match",
    grain: "175",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/7.62_M118_Cartridge.JPG",
    locales: {
      en: {
        type: "Precision Rifle",
        name: "M118LR BTHP Match",
        cal: "7.62×51mm NATO",
        vel: "2,580 fps",
        price: "$39.99 /20rd",
      },
      pt: {
        type: "Rifle de Precisão",
        name: "M118LR BTHP Match",
        cal: "7.62×51mm NATO",
        vel: "786 m/s",
        price: "R$ 159,90 /20pc",
      },
      de: {
        type: "Präzisionspatrone",
        name: "M118LR BTHP Match",
        cal: "7,62×51mm NATO",
        vel: "786 m/s",
        price: "34,99 € /20 Stk.",
      },
      jp: {
        type: "精密射撃弾",
        name: "M118LR BTHP マッチ",
        cal: "7.62×51mm NATO",
        vel: "786 m/s",
        price: "¥7,200 /20発",
      },
    },
  },
  {
    id: "12ga-00buck",
    grain: "485",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Shotgun_shell_comparison.jpg",
    locales: {
      en: {
        type: "Shotshell",
        name: '00 Buck 2¾"',
        cal: "12 Gauge",
        vel: "1,325 fps",
        price: "$14.99 /25rd",
      },
      pt: {
        type: "Cartucho de Espingarda",
        name: '00 Buck 2¾"',
        cal: "Cal. 12",
        vel: "404 m/s",
        price: "R$ 59,90 /25pc",
      },
      de: {
        type: "Schrotpatrone",
        name: '00 Buck 2¾"',
        cal: "Kaliber 12",
        vel: "404 m/s",
        price: "12,99 € /25 Stk.",
      },
      jp: {
        type: "散弾銃弾",
        name: '00バック 2¾"',
        cal: "12ゲージ",
        vel: "404 m/s",
        price: "¥2,900 /25発",
      },
    },
  },
  {
    id: "338-lapua",
    grain: "300",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Cartridge_.338_Lapua_Magnum.jpg",
    locales: {
      en: {
        type: "Long Range",
        name: ".338 Lapua HPBT",
        cal: ".338 Lapua Magnum",
        vel: "2,723 fps",
        price: "$89.99 /20rd",
      },
      pt: {
        type: "Longo Alcance",
        name: ".338 Lapua HPBT",
        cal: ".338 Lapua Magnum",
        vel: "830 m/s",
        price: "R$ 359,90 /20pc",
      },
      de: {
        type: "Langstreckenpatrone",
        name: ".338 Lapua HPBT",
        cal: ".338 Lapua Magnum",
        vel: "830 m/s",
        price: "79,99 € /20 Stk.",
      },
      jp: {
        type: "長距離狙撃弾",
        name: ".338ラプアHPBT",
        cal: ".338ラプアマグナム",
        vel: "830 m/s",
        price: "¥16,500 /20発",
      },
    },
  },
  {
    id: "45acp-jhp",
    grain: "230",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/HK_USP_45_surrounded_by_.45_caliber_Hornady_TAP_%28%2BP%29_jacketed_hollow_point_rounds.jpg",
    locales: {
      en: {
        type: "Defensive Handgun",
        name: ".45 ACP +P JHP",
        cal: ".45 ACP",
        vel: "950 fps",
        price: "$27.99 /20rd",
      },
      pt: {
        type: "Defesa Pessoal",
        name: ".45 ACP +P JHP",
        cal: ".45 ACP",
        vel: "290 m/s",
        price: "R$ 109,90 /20pc",
      },
      de: {
        type: "Defensivpatrone",
        name: ".45 ACP +P JHP",
        cal: ".45 ACP",
        vel: "290 m/s",
        price: "24,99 € /20 Stk.",
      },
      jp: {
        type: "防衛用ハンドガン弾",
        name: ".45 ACP +P JHP",
        cal: ".45 ACP",
        vel: "290 m/s",
        price: "¥5,200 /20発",
      },
    },
  },
];
