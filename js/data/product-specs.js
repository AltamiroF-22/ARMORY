/* ============================================================
   data/product-specs.js
   Static technical data per product.
   Each product has a locale map (en/pt/de/jp) for translated
   description, spec keys, and features.
   gallery[] and spec values (measurements) are locale-agnostic.
   ============================================================ */

export const PRODUCT_SPECS = {
  recce16: {
    gallery: [
      "https://imgs.search.brave.com/FwV9Dj5eWUB0OuOODY2AxQMU6SDjO-Igm5aVB08Bajc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG93YWlyNi5jb20v/Mjg3NTAtbGFyZ2Vf/ZGVmYXVsdC92ZmMt/c3IxNi1rbmlnaHRz/LWFybWFtZW50LWNx/YnIuanBn",
      "https://imgs.search.brave.com/ATE94Rt0n4UfjNm0liYb4-36ZnGj_5wizzVm4cNoKHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZ2ls/aXRlZ2Vhci5jb20v/Y2RuL3Nob3AvcHJv/ZHVjdHMvTVRfNF82/MDB4XzEuanBnP3Y9/MTU3MDIyNzgzNSZ3/aWR0aD02MDA",
      "https://imgs.search.brave.com/krDsEubpXKZVFnQhgIYDc_1GLHCEGw3cmwTuI1W-a4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxsNHNob290ZXJz/LmNvbS9lbi9zaG9v/dGluZy9waXN0b2xz/L2ZpcnN0LWxvb2st/YXQtdGhlLWNpdmls/aWFuLXZlcnNpb25z/LXNpZy1zYXVlci1w/MzIwLW0xNy1pbmNs/dWRpbmctYXZhaWxh/YmlsaXR5LWFuZC1w/cmljZXMtZm9yLXVz/LWFuZC1ldXJvcGUv/c2lnLXNhdWVyLXAz/MjAtbTE3LXJpZ2h0/LXNpZGUuanBnP2Np/ZD0xNXNnLms2NiZy/ZXNpemU9OTM4MTIx/OjE0Mzl4",
      "https://imgs.search.brave.com/r8Ov2DBADxrN4Xmm-VRuthJXKBBPrEb6VByPVYUYYao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcHRpY3MuZXUv/d3Avd3AtY29udGVu/dC91cGxvYWRzL0Zs/aXItc2NvdXQtNC5q/cGc",
    ],
    locales: {
      en: {
        highlights: [
          { value: "5.56", label: "Caliber" },
          { value: "6.5", label: "lbs" },
          { value: '16"', label: "Barrel" },
        ],
        description:
          "The RECCE-16 CQBR is a close-quarters battle rifle engineered for operators demanding precision in confined environments. Built on a mil-spec lower with a 16\" chrome-lined barrel and a direct-impingement gas system proven across thousands of combat deployments.",
        specs: [
          { key: "Action", val: "Semi-Auto, DI Gas" },
          { key: "Caliber", val: "5.56×45mm NATO" },
          { key: "Barrel Length", val: '16" Chrome-Lined' },
          { key: "Overall Length", val: '35.5" (extended)' },
          { key: "Weight", val: "6.5 lbs (unloaded)" },
          { key: "Twist Rate", val: '1:7" RH' },
          { key: "Capacity", val: "30+1 Rounds" },
          { key: "Material", val: "Mil-Spec 7075-T6 AL" },
        ],
        features: [
          "Chrome-lined barrel for sustained fire and corrosion resistance",
          "Mil-spec forged aluminum upper and lower receivers",
          "Free-floating M-LOK handguard for accessory mounting",
          "Ambidextrous controls for left and right-handed operators",
        ],
      },
      pt: {
        highlights: [
          { value: "5.56", label: "Calibre" },
          { value: "6.5", label: "lbs" },
          { value: '16"', label: "Cano" },
        ],
        description:
          "O RECCE-16 CQBR é um rifle de combate em curta distância projetado para operadores que exigem precisão em ambientes confinados. Construído com receptor inferior mil-spec com cano cromado de 16\" e sistema a gás de impingência direta comprovado em milhares de operações.",
        specs: [
          { key: "Ação", val: "Semi-Auto, Gás DI" },
          { key: "Calibre", val: "5.56×45mm NATO" },
          { key: "Comprimento do Cano", val: '16" Cromado' },
          { key: "Comprimento Total", val: '35.5" (estendido)' },
          { key: "Peso", val: "6.5 lbs (sem carga)" },
          { key: "Taxa de Giro", val: '1:7" RH' },
          { key: "Capacidade", val: "30+1 Cartuchos" },
          { key: "Material", val: "7075-T6 AL Forjado" },
        ],
        features: [
          "Cano cromado para disparo sustentado e resistência à corrosão",
          "Receptores superior e inferior de alumínio forjado mil-spec",
          "Protetor de mão M-LOK flutuante para montagem de acessórios",
          "Controles ambidestros para operadores destros e canhotos",
        ],
      },
      de: {
        highlights: [
          { value: "5.56", label: "Kaliber" },
          { value: "6.5", label: "lbs" },
          { value: '16"', label: "Lauf" },
        ],
        description:
          "Das RECCE-16 CQBR ist ein Nahkampfgewehr für Operatoren, die in engen Umgebungen Präzision verlangen. Gebaut auf einem mil-spec Unterlauf mit 16\" chromgebohrtem Lauf und einem direkt-impingement Gassystem, das in tausenden Kampfeinsätzen erprobt wurde.",
        specs: [
          { key: "Aktion", val: "Halbautomatisch, DI-Gas" },
          { key: "Kaliber", val: "5.56×45mm NATO" },
          { key: "Lauflänge", val: '16" Chromiert' },
          { key: "Gesamtlänge", val: '35.5" (ausgeklappt)' },
          { key: "Gewicht", val: "6.5 lbs (ungeladen)" },
          { key: "Drallsteigung", val: '1:7" RH' },
          { key: "Kapazität", val: "30+1 Patronen" },
          { key: "Material", val: "Mil-Spec 7075-T6 AL" },
        ],
        features: [
          "Chromierter Lauf für Dauerfeuer und Korrosionsbeständigkeit",
          "Mil-spec geschmiedete Aluminium-Ober- und Unterteile",
          "Freischwebender M-LOK Handschutz für Zubehörmontage",
          "Beidhändige Bedienung für Links- und Rechtshänder",
        ],
      },
      jp: {
        highlights: [
          { value: "5.56", label: "口径" },
          { value: "6.5", label: "ポンド" },
          { value: '16"', label: "銃身" },
        ],
        description:
          "RECCE-16 CQBRは、狭い環境での精密射撃を要求するオペレーター向けに設計された近接戦闘ライフルです。ミルスペック規格のロアレシーバーに16インチのクロームラインドバレルを搭載し、直動式ガスシステムを採用しています。",
        specs: [
          { key: "作動方式", val: "半自動、DIガス" },
          { key: "口径", val: "5.56×45mm NATO" },
          { key: "銃身長", val: '16" クロームライン' },
          { key: "全長", val: '35.5"（ストック展開時）' },
          { key: "重量", val: "6.5 lbs（空のとき）" },
          { key: "ライフリング", val: '1:7" RH' },
          { key: "装弾数", val: "30+1 発" },
          { key: "素材", val: "ミルスペック 7075-T6 AL" },
        ],
        features: [
          "クロームラインドバレルによる持続射撃と耐腐食性",
          "ミルスペック鍛造アルミ製アッパー・ロアレシーバー",
          "アクセサリー取り付け用フリーフロートM-LOKハンドガード",
          "左右両利きオペレーター対応のアンビコントロール",
        ],
      },
    },
  },

  opscore: {
    gallery: [
      "https://imgs.search.brave.com/ATE94Rt0n4UfjNm0liYb4-36ZnGj_5wizzVm4cNoKHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZ2ls/aXRlZ2Vhci5jb20v/Y2RuL3Nob3AvcHJv/ZHVjdHMvTVRfNF82/MDB4XzEuanBnP3Y9/MTU3MDIyNzgzNSZ3/aWR0aD02MDA",
      "https://imgs.search.brave.com/FwV9Dj5eWUB0OuOODY2AxQMU6SDjO-Igm5aVB08Bajc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG93YWlyNi5jb20v/Mjg3NTAtbGFyZ2Vf/ZGVmYXVsdC92ZmMt/c3IxNi1rbmlnaHRz/LWFybWFtZW50LWNx/YnIuanBn",
      "https://imgs.search.brave.com/krDsEubpXKZVFnQhgIYDc_1GLHCEGw3cmwTuI1W-a4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxsNHNob290ZXJz/LmNvbS9lbi9zaG9v/dGluZy9waXN0b2xz/L2ZpcnN0LWxvb2st/YXQtdGhlLWNpdmls/aWFuLXZlcnNpb25z/LXNpZy1zYXVlci1w/MzIwLW0xNy1pbmNs/dWRpbmctYXZhaWxh/YmlsaXR5LWFuZC1w/cmljZXMtZm9yLXVz/LWFuZC1ldXJvcGUv/c2lnLXNhdWVyLXAz/MjAtbTE3LXJpZ2h0/LXNpZGUuanBnP2Np/ZD0xNXNnLms2NiZy/ZXNpemU9OTM4MTIx/OjE0Mzl4",
      "https://imgs.search.brave.com/r8Ov2DBADxrN4Xmm-VRuthJXKBBPrEb6VByPVYUYYao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcHRpY3MuZXUv/d3Avd3AtY29udGVu/dC91cGxvYWRzL0Zs/aXItc2NvdXQtNC5q/cGc",
    ],
    locales: {
      en: {
        highlights: [
          { value: "2.1", label: "lbs" },
          { value: "IIIA", label: "Rating" },
          { value: "UHMWPE", label: "Shell" },
        ],
        description:
          "The Ops-Core FAST MT Carbon is the standard-issue helmet for tier-one operators worldwide. Ultra-High Molecular Weight Polyethylene construction delivers NIJ IIIA ballistic protection at minimum weight. Every gram has been accounted for.",
        specs: [
          { key: "Protection Level", val: "NIJ Std. 0106.01 IIIA" },
          { key: "Shell Material", val: "Ultra-High Molecular Weight PE" },
          { key: "Weight", val: "2.1 lbs (M/L size)" },
          { key: "Coverage", val: "High-Cut" },
          { key: "Rail System", val: "FAST Rail (Picatinny)" },
          { key: "NVG Mount", val: "Integrated Shroud" },
          { key: "Sizes", val: "S/M · M/L · L/XL" },
          { key: "Colors", val: "Black · Foliage · Coyote" },
        ],
        features: [
          "NIJ IIIA certified — stops 9mm, .44 Magnum and more",
          "Ultra-High Molecular Weight PE for unmatched strength-to-weight",
          "Full FAST rail system for accessory integration",
          "NVG shroud compatible — mounts J-Arm or Wilcox adapter",
        ],
      },
      pt: {
        highlights: [
          { value: "2.1", label: "lbs" },
          { value: "IIIA", label: "Nível" },
          { value: "UHMWPE", label: "Casco" },
        ],
        description:
          "O Ops-Core FAST MT Carbon é o capacete padrão para operadores de primeiro escalão em todo o mundo. A construção em Polietileno de Ultra Alto Peso Molecular oferece proteção balística NIJ IIIA com o mínimo de peso. Cada grama foi considerada.",
        specs: [
          { key: "Nível de Proteção", val: "NIJ Std. 0106.01 IIIA" },
          { key: "Material do Casco", val: "PE de Ultra Alto Peso Molecular" },
          { key: "Peso", val: "2.1 lbs (tamanho M/L)" },
          { key: "Cobertura", val: "High-Cut" },
          { key: "Sistema de Trilho", val: "FAST Rail (Picatinny)" },
          { key: "Suporte NVG", val: "Shroud Integrado" },
          { key: "Tamanhos", val: "S/M · M/L · L/XL" },
          { key: "Cores", val: "Preto · Folhagem · Coiote" },
        ],
        features: [
          "Certificado NIJ IIIA — detém 9mm, .44 Magnum e mais",
          "PE de Ultra Alto Peso Molecular para resistência incomparável",
          "Sistema completo de trilho FAST para integração de acessórios",
          "Compatível com montagem NVG via adaptador J-Arm ou Wilcox",
        ],
      },
      de: {
        highlights: [
          { value: "2.1", label: "lbs" },
          { value: "IIIA", label: "Schutzstufe" },
          { value: "UHMWPE", label: "Schale" },
        ],
        description:
          "Der Ops-Core FAST MT Carbon ist der Standardhelm für Tier-1-Operatoren weltweit. Die Konstruktion aus Ultra-Hochmolekulargewicht-Polyethylen bietet NIJ-IIIA-ballistischen Schutz bei minimalem Gewicht. Jedes Gramm wurde berücksichtigt.",
        specs: [
          { key: "Schutzstufe", val: "NIJ Std. 0106.01 IIIA" },
          { key: "Schalenmaterial", val: "Ultra-HMWPE" },
          { key: "Gewicht", val: "2.1 lbs (Größe M/L)" },
          { key: "Abdeckung", val: "High-Cut" },
          { key: "Schienensystem", val: "FAST Rail (Picatinny)" },
          { key: "NVG-Halterung", val: "Integrierter Shroud" },
          { key: "Größen", val: "S/M · M/L · L/XL" },
          { key: "Farben", val: "Schwarz · Foliage · Coyote" },
        ],
        features: [
          "NIJ IIIA zertifiziert — hält 9mm, .44 Magnum und mehr stand",
          "Ultra-HMWPE für unübertroffenes Stärke-Gewicht-Verhältnis",
          "Volles FAST-Schienensystem zur Zubehörintegration",
          "NVG-Shroud kompatibel — für J-Arm oder Wilcox-Adapter",
        ],
      },
      jp: {
        highlights: [
          { value: "2.1", label: "ポンド" },
          { value: "IIIA", label: "防護等級" },
          { value: "UHMWPE", label: "シェル" },
        ],
        description:
          "Ops-Core FAST MT Carbonは、世界中のトップオペレーター向けの標準装備ヘルメットです。超高分子量ポリエチレン構造により、最小限の重量でNIJ IIIA防弾性能を提供します。全てのグラムが計算されています。",
        specs: [
          { key: "防護等級", val: "NIJ Std. 0106.01 IIIA" },
          { key: "シェル素材", val: "超高分子量ポリエチレン" },
          { key: "重量", val: "2.1 lbs（M/Lサイズ）" },
          { key: "カバレッジ", val: "ハイカット" },
          { key: "レールシステム", val: "FASTレール（ピカティニー）" },
          { key: "NVGマウント", val: "統合シュラウド" },
          { key: "サイズ", val: "S/M · M/L · L/XL" },
          { key: "カラー", val: "ブラック · フォリッジ · コヨーテ" },
        ],
        features: [
          "NIJ IIIA認定 — 9mm、.44マグナム等を防護",
          "超高分子量PEによる比類なき強度対重量比",
          "アクセサリー統合のための完全FASTレールシステム",
          "J-ArmまたはWilcoxアダプター対応NVGシュラウド互換",
        ],
      },
    },
  },

  "sig-m17": {
    gallery: [
      "https://imgs.search.brave.com/krDsEubpXKZVFnQhgIYDc_1GLHCEGw3cmwTuI1W-a4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxsNHNob290ZXJz/LmNvbS9lbi9zaG9v/dGluZy9waXN0b2xz/L2ZpcnN0LWxvb2st/YXQtdGhlLWNpdmls/aWFuLXZlcnNpb25z/LXNpZy1zYXVlci1w/MzIwLW0xNy1pbmNs/dWRpbmctYXZhaWxh/YmlsaXR5LWFuZC1w/cmljZXMtZm9yLXVz/LWFuZC1ldXJvcGUv/c2lnLXNhdWVyLXAz/MjAtbTE3LXJpZ2h0/LXNpZGUuanBnP2Np/ZD0xNXNnLms2NiZy/ZXNpemU9OTM4MTIx/OjE0Mzl4",
      "https://imgs.search.brave.com/FwV9Dj5eWUB0OuOODY2AxQMU6SDjO-Igm5aVB08Bajc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG93YWlyNi5jb20v/Mjg3NTAtbGFyZ2Vf/ZGVmYXVsdC92ZmMt/c3IxNi1rbmlnaHRz/LWFybWFtZW50LWNx/YnIuanBn",
      "https://imgs.search.brave.com/ATE94Rt0n4UfjNm0liYb4-36ZnGj_5wizzVm4cNoKHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZ2ls/aXRlZ2Vhci5jb20v/Y2RuL3Nob3AvcHJv/ZHVjdHMvTVRfNF82/MDB4XzEuanBnP3Y9/MTU3MDIyNzgzNSZ3/aWR0aD02MDA",
      "https://imgs.search.brave.com/r8Ov2DBADxrN4Xmm-VRuthJXKBBPrEb6VByPVYUYYao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcHRpY3MuZXUv/d3Avd3AtY29udGVu/dC91cGxvYWRzL0Zs/aXItc2NvdXQtNC5q/cGc",
    ],
    locales: {
      en: {
        highlights: [
          { value: "9mm", label: "Caliber" },
          { value: '4.7"', label: "Barrel" },
          { value: "17+1", label: "Capacity" },
        ],
        description:
          "The SIG SAUER M17 is the U.S. Army's official duty pistol, selected through the Army Modular Handgun System competition. It delivers proven reliability, sub-MOA accuracy, and modular configurability in every engagement.",
        specs: [
          { key: "Action", val: "Semi-Auto, DA/SA" },
          { key: "Caliber", val: "9mm Luger" },
          { key: "Barrel Length", val: '4.7"' },
          { key: "Overall Length", val: '8.0"' },
          { key: "Weight", val: "29.4 oz (unloaded)" },
          { key: "Capacity", val: "17+1 Rounds" },
          { key: "Safety", val: "Manual Thumb Safety" },
          { key: "Finish", val: "Coyote PVD" },
        ],
        features: [
          "Adopted as the U.S. Army's official service pistol",
          "Removable fire control assembly for modular configuration",
          "Manual thumb safety for enhanced operational safety",
          "Optic-ready slide accepts micro red-dot systems",
        ],
      },
      pt: {
        highlights: [
          { value: "9mm", label: "Calibre" },
          { value: '4.7"', label: "Cano" },
          { value: "17+1", label: "Capacidade" },
        ],
        description:
          "A SIG SAUER M17 é a pistola oficial do Exército dos EUA, selecionada através do programa Modular Handgun System. Oferece confiabilidade comprovada, precisão sub-MOA e configurabilidade modular em qualquer combate.",
        specs: [
          { key: "Ação", val: "Semi-Auto, DA/SA" },
          { key: "Calibre", val: "9mm Luger" },
          { key: "Comprimento do Cano", val: '4.7"' },
          { key: "Comprimento Total", val: '8.0"' },
          { key: "Peso", val: "29.4 oz (sem carga)" },
          { key: "Capacidade", val: "17+1 Cartuchos" },
          { key: "Segurança", val: "Trava Manual de Polegar" },
          { key: "Acabamento", val: "Coiote PVD" },
        ],
        features: [
          "Adotada como pistola oficial do Exército dos EUA",
          "Conjunto de controle de disparo removível para configuração modular",
          "Trava manual de polegar para segurança operacional aprimorada",
          "Slide pronto para óptica aceita sistemas de ponto vermelho",
        ],
      },
      de: {
        highlights: [
          { value: "9mm", label: "Kaliber" },
          { value: '4.7"', label: "Lauf" },
          { value: "17+1", label: "Kapazität" },
        ],
        description:
          "Die SIG SAUER M17 ist die offizielle Dienstpistole der U.S. Army, ausgewählt durch das Modular Handgun System-Programm. Sie bietet bewährte Zuverlässigkeit, Sub-MOA-Genauigkeit und modulare Konfigurierbarkeit in jedem Einsatz.",
        specs: [
          { key: "Aktion", val: "Halbautomatisch, DA/SA" },
          { key: "Kaliber", val: "9mm Luger" },
          { key: "Lauflänge", val: '4.7"' },
          { key: "Gesamtlänge", val: '8.0"' },
          { key: "Gewicht", val: "29.4 oz (ungeladen)" },
          { key: "Kapazität", val: "17+1 Patronen" },
          { key: "Sicherung", val: "Manuelle Daumensicherung" },
          { key: "Oberfläche", val: "Coyote PVD" },
        ],
        features: [
          "Offizielle Dienstpistole der U.S. Army",
          "Abnehmbares Abzugsmodul für modulare Konfiguration",
          "Manuelle Daumensicherung für erhöhte Betriebssicherheit",
          "Optikbereiter Schlitten für Micro-Red-Dot-Systeme",
        ],
      },
      jp: {
        highlights: [
          { value: "9mm", label: "口径" },
          { value: '4.7"', label: "銃身" },
          { value: "17+1", label: "装弾数" },
        ],
        description:
          "SIG SAUER M17は、米陸軍モジュラーハンドガンシステムプログラムで採用された公式サービスピストルです。あらゆる戦闘での実証済みの信頼性、サブMOAの精度、モジュラー構成を提供します。",
        specs: [
          { key: "作動方式", val: "半自動、DA/SA" },
          { key: "口径", val: "9mm ルガー" },
          { key: "銃身長", val: '4.7"' },
          { key: "全長", val: '8.0"' },
          { key: "重量", val: "29.4 oz（空のとき）" },
          { key: "装弾数", val: "17+1 発" },
          { key: "安全装置", val: "マニュアルサムセーフティ" },
          { key: "仕上げ", val: "コヨーテ PVD" },
        ],
        features: [
          "米陸軍公式サービスピストルとして採用",
          "モジュラー構成のための取り外し可能なファイアコントロール",
          "操作安全性向上のためのマニュアルサムセーフティ",
          "マイクロレッドドット対応のオプティクスレディスライド",
        ],
      },
    },
  },

  "flir-tk": {
    gallery: [
      "https://imgs.search.brave.com/r8Ov2DBADxrN4Xmm-VRuthJXKBBPrEb6VByPVYUYYao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcHRpY3MuZXUv/d3Avd3AtY29udGVu/dC91cGxvYWRzL0Zs/aXItc2NvdXQtNC5q/cGc",
      "https://imgs.search.brave.com/FwV9Dj5eWUB0OuOODY2AxQMU6SDjO-Igm5aVB08Bajc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG93YWlyNi5jb20v/Mjg3NTAtbGFyZ2Vf/ZGVmYXVsdC92ZmMt/c3IxNi1rbmlnaHRz/LWFybWFtZW50LWNx/YnIuanBn",
      "https://imgs.search.brave.com/krDsEubpXKZVFnQhgIYDc_1GLHCEGw3cmwTuI1W-a4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxsNHNob290ZXJz/LmNvbS9lbi9zaG9v/dGluZy9waXN0b2xz/L2ZpcnN0LWxvb2st/YXQtdGhlLWNpdmls/aWFuLXZlcnNpb25z/LXNpZy1zYXVlci1w/MzIwLW0xNy1pbmNs/dWRpbmctYXZhaWxh/YmlsaXR5LWFuZC1w/cmljZXMtZm9yLXVz/LWFuZC1ldXJvcGUv/c2lnLXNhdWVyLXAz/MjAtbTE3LXJpZ2h0/LXNpZGUuanBnP2Np/ZD0xNXNnLms2NiZy/ZXNpemU9OTM4MTIx/OjE0Mzl4",
      "https://imgs.search.brave.com/ATE94Rt0n4UfjNm0liYb4-36ZnGj_5wizzVm4cNoKHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZ2ls/aXRlZ2Vhci5jb20v/Y2RuL3Nob3AvcHJv/ZHVjdHMvTVRfNF82/MDB4XzEuanBnP3Y9/MTU3MDIyNzgzNSZ3/aWR0aD02MDA",
    ],
    locales: {
      en: {
        highlights: [
          { value: "160px", label: "Thermal" },
          { value: "100m", label: "Range" },
          { value: "10hr", label: "Battery" },
        ],
        description:
          "The FLIR Scout TK is a palm-sized thermal monocular delivering serious detection capability in any light condition. Its 160×120 Lepton® micro thermal sensor captures heat signatures at distances up to 100 meters — instant-on, no warm-up required.",
        specs: [
          { key: "Detector Resolution", val: "160×120 LWIR" },
          { key: "Sensor", val: "FLIR Lepton® Micro Thermal" },
          { key: "Detection Range", val: "100m (standing person)" },
          { key: "Battery Life", val: "10 hours" },
          { key: "Weight", val: "0.52 lbs (236 g)" },
          { key: "Refresh Rate", val: "9 Hz" },
          { key: "Lens", val: "18 mm f/1.1" },
          { key: "Operating Temp", val: "−20 °C to +50 °C" },
        ],
        features: [
          "FLIR Lepton® micro thermal — battle-proven heat detection",
          "9 Hz refresh rate for smooth real-time imaging",
          "Instant-on with zero warm-up time required",
          "Wi-Fi connectivity for live streaming to mobile devices",
        ],
      },
      pt: {
        highlights: [
          { value: "160px", label: "Térmico" },
          { value: "100m", label: "Alcance" },
          { value: "10h", label: "Bateria" },
        ],
        description:
          "O FLIR Scout TK é um monóculo térmico do tamanho da palma da mão com séria capacidade de detecção em qualquer condição de luz. Seu sensor micro térmico Lepton® 160×120 captura assinaturas de calor a até 100 metros — ligado instantaneamente, sem aquecimento.",
        specs: [
          { key: "Resolução do Detector", val: "160×120 LWIR" },
          { key: "Sensor", val: "FLIR Lepton® Micro Térmico" },
          { key: "Alcance de Detecção", val: "100m (pessoa em pé)" },
          { key: "Duração da Bateria", val: "10 horas" },
          { key: "Peso", val: "0.52 lbs (236 g)" },
          { key: "Taxa de Atualização", val: "9 Hz" },
          { key: "Lente", val: "18 mm f/1.1" },
          { key: "Temperatura Operacional", val: "−20 °C a +50 °C" },
        ],
        features: [
          "Sensor micro térmico FLIR Lepton® — detecção de calor comprovada",
          "Taxa de 9 Hz para imagens em tempo real fluidas",
          "Ligação instantânea sem tempo de aquecimento",
          "Conectividade Wi-Fi para streaming ao vivo em dispositivos móveis",
        ],
      },
      de: {
        highlights: [
          { value: "160px", label: "Wärme" },
          { value: "100m", label: "Reichweite" },
          { value: "10Std", label: "Akku" },
        ],
        description:
          "Das FLIR Scout TK ist ein handflächengroßes Wärmemonokel mit ernsthafter Erkennungsfähigkeit bei jeder Lichtstärke. Sein 160×120 Lepton® Mikro-Wärmesensor erfasst Wärmesignaturen auf bis zu 100 Meter — sofort einschaltbereit, keine Aufwärmzeit erforderlich.",
        specs: [
          { key: "Detektorauflösung", val: "160×120 LWIR" },
          { key: "Sensor", val: "FLIR Lepton® Mikro-Wärme" },
          { key: "Erkennungsreichweite", val: "100m (stehende Person)" },
          { key: "Akkulaufzeit", val: "10 Stunden" },
          { key: "Gewicht", val: "0.52 lbs (236 g)" },
          { key: "Bildwiederholrate", val: "9 Hz" },
          { key: "Objektiv", val: "18 mm f/1.1" },
          { key: "Betriebstemperatur", val: "−20 °C bis +50 °C" },
        ],
        features: [
          "FLIR Lepton® Mikro-Wärme — kampferprobte Wärmeerkennung",
          "9 Hz Bildwiederholrate für flüssige Echtzeit-Bildgebung",
          "Sofort einschaltbereit ohne Aufwärmzeit",
          "Wi-Fi-Konnektivität für Live-Streaming auf Mobilgeräte",
        ],
      },
      jp: {
        highlights: [
          { value: "160px", label: "サーマル" },
          { value: "100m", label: "検知距離" },
          { value: "10時間", label: "バッテリー" },
        ],
        description:
          "FLIR Scout TKは、あらゆる光条件で本格的な検知能力を発揮する手のひらサイズの熱単眼鏡です。160×120のLepton®マイクロサーマルセンサーは最大100メートルの熱源を検知します — 即時起動、ウォームアップ不要。",
        specs: [
          { key: "検出器解像度", val: "160×120 LWIR" },
          { key: "センサー", val: "FLIR Lepton® マイクロサーマル" },
          { key: "検知距離", val: "100m（立った人）" },
          { key: "バッテリー寿命", val: "10時間" },
          { key: "重量", val: "0.52 lbs（236 g）" },
          { key: "フレームレート", val: "9 Hz" },
          { key: "レンズ", val: "18 mm f/1.1" },
          { key: "動作温度", val: "−20 °C ～ +50 °C" },
        ],
        features: [
          "FLIR Lepton® マイクロサーマル — 実戦証明済みの熱検知",
          "滑らかなリアルタイム映像のための9Hzフレームレート",
          "ウォームアップ不要の即時起動",
          "モバイルデバイスへのライブストリーミング対応Wi-Fi",
        ],
      },
    },
  },
};
