export interface PackageData {
    id: number;
    name: string;
    price: number;
    description: string;
    validity: string;
  }
  

  export interface PurchaseHistory{
    id?: string;
    userId: string;
    packageId: string;
    paymentMethod: string;
    purchaseDate: number;
  }