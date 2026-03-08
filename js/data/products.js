/* ============================================================
   data/products.js
   Simulates a product API response.
   Each product carries its own locale map for all translated
   fields (cat, name, price). UI strings (section title, eyebrow,
   etc.) stay in js/locales/. Only product data lives here.
   ============================================================ */

export const PRODUCTS = [
  {
    id: "recce16",
    image:
      "https://imgs.search.brave.com/FwV9Dj5eWUB0OuOODY2AxQMU6SDjO-Igm5aVB08Bajc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG93YWlyNi5jb20v/Mjg3NTAtbGFyZ2Vf/ZGVmYXVsdC92ZmMt/c3IxNi1rbmlnaHRz/LWFybWFtZW50LWNx/YnIuanBn",
    locales: {
      en: { cat: "Carbine", name: "RECCE-16 CQBR", price: "$3,499" },
      pt: { cat: "Carabina", name: "RECCE-16 CQBR", price: "R$ 17.499" },
      de: { cat: "Karabiner", name: "RECCE-16 CQBR", price: "3.299 €" },
      jp: { cat: "カービン", name: "RECCE-16 CQBR", price: "¥521,000" },
    },
  },
  {
    id: "opscore",
    image:
      "https://imgs.search.brave.com/ATE94Rt0n4UfjNm0liYb4-36ZnGj_5wizzVm4cNoKHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZ2ls/aXRlZ2Vhci5jb20v/Y2RuL3Nob3AvcHJv/ZHVjdHMvTVRfNF82/MDB4XzEuanBnP3Y9/MTU3MDIyNzgzNSZ3/aWR0aD02MDA",
    locales: {
      en: { cat: "Protection", name: "Ops-Core FAST MT", price: "$1,299" },
      pt: { cat: "Proteção", name: "Ops-Core FAST MT", price: "R$ 6.499" },
      de: { cat: "Schutz", name: "Ops-Core FAST MT", price: "1.199 €" },
      jp: { cat: "ヘルメット", name: "Ops-Core FAST MT", price: "¥194,000" },
    },
  },
  {
    id: "sig-m17",
    image:
      "https://imgs.search.brave.com/krDsEubpXKZVFnQhgIYDc_1GLHCEGw3cmwTuI1W-a4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWxsNHNob290ZXJz/LmNvbS9lbi9zaG9v/dGluZy9waXN0b2xz/L2ZpcnN0LWxvb2st/YXQtdGhlLWNpdmls/aWFuLXZlcnNpb25z/LXNpZy1zYXVlci1w/MzIwLW0xNy1pbmNs/dWRpbmctYXZhaWxh/YmlsaXR5LWFuZC1w/cmljZXMtZm9yLXVz/LWFuZC1ldXJvcGUv/c2lnLXNhdWVyLXAz/MjAtbTE3LXJpZ2h0/LXNpZGUuanBnP2Np/ZD0xNXNnLms2NiZy/ZXNpemU9OTM4MTIx/OjE0Mzl4",
    locales: {
      en: { cat: "Sidearm", name: "SIG SAUER M17", price: "$699" },
      pt: { cat: "Pistola", name: "SIG SAUER M17", price: "R$ 3.499" },
      de: { cat: "Kurzwaffe", name: "SIG SAUER M17", price: "649 €" },
      jp: { cat: "ピストル", name: "SIG SAUER M17", price: "¥104,000" },
    },
  },
  {
    id: "flir-tk",
    image:
      "https://imgs.search.brave.com/r8Ov2DBADxrN4Xmm-VRuthJXKBBPrEb6VByPVYUYYao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcHRpY3MuZXUv/d3Avd3AtY29udGVu/dC91cGxvYWRzL0Zs/aXItc2NvdXQtNC5q/cGc",
    locales: {
      en: { cat: "Optics", name: "FLIR Scout TK", price: "$599" },
      pt: { cat: "Óptica", name: "FLIR Scout TK", price: "R$ 2.999" },
      de: { cat: "Optik", name: "FLIR Scout TK", price: "549 €" },
      jp: { cat: "光学機器", name: "FLIR Scout TK", price: "¥89,800" },
    },
  },
];
