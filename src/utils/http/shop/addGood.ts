export interface AddGoodProp {
  name: string;
  type: string;
  picUrl: string;
  info: string;
  prices: [
    {
      time: -1;
      price: 44.3;
      pledge: -1.0;
    },
    {
      time: 604800000;
      price: 12.1;
      pledge: 50.0;
    },
  ];
}
