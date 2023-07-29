interface IProduct {
  name: string
  category: string
  image: string
  price: number
  priceWithDiscount: number
}

export const products: IProduct[] = [
  {
    name: 'Lager',
    category: 'Beers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/lager_g8dmrj.png',
    price: 2.20,
    priceWithDiscount: 1.98
  },
  {
    name: 'Ipa',
    category: 'Beers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/ipa_vtljwe.png',
    price: 2.35,
    priceWithDiscount: 2.12
  },
  {
    name: 'Non-Alcoholic Toast',
    category: 'Beers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/0_0_tostada_gh87nd.png',
    price: 2.35,
    priceWithDiscount: 2.12
  },
  {
    name: 'Gluten Free',
    category: 'Beers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/sin_gluten_teqhwz.png',
    price: 2.40,
    priceWithDiscount: 2.16
  },
  {
    name: '360',
    category: 'Beers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/360_jhfyt1.png',
    price: 2.20,
    priceWithDiscount: 1.98
  },
  {
    name: 'Jamonera',
    category: 'Beers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632846/restaurant-booking/beers/jamonera_akjukz.png',
    price: 2.20,
    priceWithDiscount: 1.98
  },
  {
    name: 'Clean Wheat',
    category: 'Beers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690632847/restaurant-booking/beers/trigo_limpio_xbt68y.png',
    price: 2.35,
    priceWithDiscount: 2.12
  },
  {
    name: 'Smoked BBQ',
    category: 'Burgers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690650486/restaurant-booking/burgers/mega-smoked_plopvy_pmwxin.jpg',
    price: 11.45,
    priceWithDiscount: 10.30
  },
  {
    name: 'Double Smoked BBQ',
    category: 'Burgers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690650486/restaurant-booking/burgers/340-300-mega-smoked-double_meclk4_fdr5kg.jpg',
    price: 13.45,
    priceWithDiscount: 12.10
  },
  {
    name: 'Double Bacon',
    category: 'Burgers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690650486/restaurant-booking/burgers/340-300-mega-power-bacon-doble_yjtg3z_fyzwfh.jpg',
    price: 13.45,
    priceWithDiscount: 12.10
  },
  {
    name: 'Double Cheddar Volcano',
    category: 'Burgers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690650486/restaurant-booking/burgers/mega-power-boom-doble-3_ubh6yv_zkwd7m.jpg',
    price: 13.45,
    priceWithDiscount: 12.10
  },
  {
    name: 'Double Mixed',
    category: 'Burgers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690650486/restaurant-booking/burgers/340-300mega-cuarto-deluxe-doble-_bid9bn.jpg',
    price: 13.00,
    priceWithDiscount: 11.70
  },
  {
    name: 'The Powerful',
    category: 'Burgers',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/v1690650486/restaurant-booking/burgers/mega-power-evolution-doble_laos1w_1_vlwmct.jpg',
    price: 13.45,
    priceWithDiscount: 12.10
  },
  {
    name: 'Cupcake',
    category: 'Desserts',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632797/restaurant-booking/desserts/cupcake_acwf93.webp',
    price: 1.55,
    priceWithDiscount: 1.39
  },
  {
    name: 'Truffles',
    category: 'Desserts',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632791/restaurant-booking/desserts/trufas_mdau6j.webp',
    price: 2.45,
    priceWithDiscount: 2.20
  },
  {
    name: 'Sablee Alfajor',
    category: 'Desserts',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632789/restaurant-booking/desserts/alfajor-sablee_tfmzmk.webp',
    price: 1.35,
    priceWithDiscount: 1.21
  },
  {
    name: 'Brownie',
    category: 'Desserts',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632789/restaurant-booking/desserts/brownie_cv3l6k.webp',
    price: 1.45,
    priceWithDiscount: 1.30
  },
  {
    name: 'Slice of Carrot Cake',
    category: 'Desserts',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_600/v1690632788/restaurant-booking/desserts/carrot-cake_cgt6wt.webp',
    price: 2.20,
    priceWithDiscount: 1.98
  },
  {
    name: 'Margherita',
    category: 'Pizzas',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/q_auto:best/v1690652530/restaurant-booking/pizzas/700-700-Group-55_mleqpj.webp',
    price: 9.45,
    priceWithDiscount: 8.50
  },
  {
    name: 'Rucula & Ham',
    category: 'Pizzas',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/q_auto:best/v1690652525/restaurant-booking/pizzas/700-700-masri_pkrdom_jhnhyw.webp',
    price: 10.95,
    priceWithDiscount: 9.85
  },
  {
    name: '4 Corners',
    category: 'Pizzas',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/q_auto:best/v1690652521/restaurant-booking/pizzas/700-700-4-gustis_p3aluf_gkgwjr.webp',
    price: 10.95,
    priceWithDiscount: 9.85
  },
  {
    name: 'Fungi',
    category: 'Pizzas',
    image: 'https://res.cloudinary.com/dfyxdowwb/image/upload/c_scale,q_auto:best,w_699/v1690652530/restaurant-booking/pizzas/700-700-champi_qzene4_ssfjdx.webp',
    price: 11.45,
    priceWithDiscount: 10.30
  }
]
