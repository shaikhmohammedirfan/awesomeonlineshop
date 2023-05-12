import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { setDoc, doc } from '@firebase/firestore';
import { usermaster } from '../interfaces/umaster';

// Define a key in local capacitory storage to store user cart id
const CART_STORAGE_KEY = 'MY_CART';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  mykey: any;
  productpresent: boolean = false;
  addqty: any;
  docid: any;

  // ********** Collection references *********//
  brandCollRef = collection(this.fs, 'brands');
  categoryCollRef = collection(this.fs, 'categories');
  productRef = collection(this.fs, 'products');
  cartDetCollRef = collection(this.fs, 'cartdetails');
  usermasterCollRef = collection(this.fs, 'usermaster');
  useremailmasterCollRef = collection(this.fs, 'useremailmaster');
  usermobilemasterCollRef = collection(this.fs, 'usermobilemaster');

  constructor(private fs: Firestore) {}

  // ************ CATEGORIES COLLECTION ************ //
  loadAllCategories(): Observable<any> {
    return collectionData(this.categoryCollRef);
  }

  // ************ BRANDS COLLECTION ************ //
  loadAllBrands(): Observable<any> {
    return collectionData(this.brandCollRef);
  }

  // ************ PRODUCTS COLLECTION ************ //

  // Arrow function with function expression
  loadProductsOnOffer = async () => {
    const offeredprodQuery = query(this.productRef, where('onSale', '==', 'Y'));
    const querySnapshot = await getDocs(offeredprodQuery);
    return querySnapshot;
  };
  // async loadProductsOnOffer(): Promise<any> {
  //   const offeredprodQuery = query(this.productRef, where('onSale', '==', 'Y'));
  //   const querySnapshot = await getDocs(offeredprodQuery);
  //   return querySnapshot;
  // }

  // ************ USERMASTER COLLECTION ************ //
  // Get cartkey stored in usermaster table
  async getCartKeyFromUserMaster(email: any): Promise<any> {
    console.log('from service', email);
    let cartKey;
    let cartKeyQuery = query(
      this.usermasterCollRef,
      where('useremail', '==', email)
    );
    const querySnapshot = await getDocs(cartKeyQuery);
    // return querySnapshot;
    // console.log('CARTKEY IN SERVICE', cartKey);
    // return cartKey;
    querySnapshot.forEach((doc: any) => {
      // console.log('from servier', doc.id);
      // console.log(doc.data);
      cartKey = doc.id;
    });
    return cartKey;
  }

  async setLocalKey(ukey: string): Promise<any> {
    // Remove existing key from local storage (capacitor storage)
    await Storage.remove({ key: CART_STORAGE_KEY });

    // Create new key on local storage (capacitor storage) ) after successfull login
    await Storage.set({ key: CART_STORAGE_KEY, value: ukey });
    return ukey;
  }

  // Add new user to user master after successfull signup
  async addToUserMaster(userdata: any): Promise<any> {
    console.log('UNDER SERVICE=', userdata.user);
    let primarycontact;

    if (userdata.user.email) {
      primarycontact = 'email';
    } else {
      primarycontact = 'mobile';
    }

    const docData = {
      uid: userdata.user.uid,
      username: userdata.user.displayName,
      useremail: userdata.user.email,
      primarycontact: primarycontact,
      // usermobile: userdata.user.phoneNumber,
      userverified: userdata.user.emailVerified,
      useractive: true,
      userrole: 'regular',
      cartkey: userdata.user.uid,
      lastmodified: serverTimestamp(),
      modifiedby: userdata.user.uid,
    };
    console.log('UNSER SERVVICE NEW USER INFO', docData);
    await setDoc(doc(this.fs, 'usermaster', userdata.user.uid), docData);

    return docData;
  }

  // Add new user email address to useremailmaster table after successfull signup
  async addToUserDelivery(userdata: any): Promise<any> {
    const docData = {
      uid: userdata.user.uid,
      deliveryPinCode: '',
      deliveryState: '',
      deliveryCity: '',
      deliveryArea: '',
      deliveryRoadOrLandmark: '',
      deliveryBldgOrAptsName: '',
      deliveryFlatorAptsNo: '',
      deliverryFloorNo: '',
      deliveryGPSCord: '',
      lastmodified: serverTimestamp(),
      modifiedby: userdata.user.uid,
    };
    await setDoc(doc(this.fs, 'userdelivery', userdata.user.uid), docData);
  }
  // Add new user email address to useremailmaster table after successfull signup
  async addToUserCurrEmail(userdata: any): Promise<any> {
    const docData = {
      uid: userdata.user.uid,
      userorigemail: userdata.user.email,
      usercurremail: userdata.user.email,
      lastmodified: serverTimestamp(),
      modifiedby: userdata.user.uid,
    };
    await setDoc(doc(this.fs, 'useremail', userdata.user.uid), docData);
  }

  // Add new user email address to useremailmaster table after successfull signup
  async addToUserCurrMobile(userdata: any): Promise<any> {
    const docData = {
      uid: userdata.user.uid,
      userorigmobile: userdata.user.phoneNumber,
      usercurrmobile: userdata.user.phoneNumber,
      lastmodified: serverTimestamp(),
      modifiedby: userdata.user.uid,
    };
    await setDoc(doc(this.fs, 'usermobile', userdata.user.uid), docData);
  }
  // ************ CART COLLECTION ************ //

  async checkLocalKey(): Promise<any> {
    const localkey = await Storage.get({ key: 'CapacitorStorage.MY_CART' });
    console.log(localkey);
    if (!localkey)
      // {
      //   return true;
      // } else {
      //   return false;
      // }
      return false;
  }
  async getLocalKey(): Promise<any> {
    const result = await Storage.get({ key: 'MY_CART' });
    console.log('cartkey=', result);
    return result.value?.trim();
  }

  async queryByCartkeyByProdid(cartkey: any, prodid: string) {
    const q = query(
      this.cartDetCollRef,
      where('productId', '==', prodid),
      where('cartKey', '==', cartkey)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  // loadLocalKey1 = () => {
  //   return new Promise((reject, resolve) => {
  //     const key =
  //       (Storage.get({ key: CART_STORAGE_KEY }),
  //       (err: any, data: any) => {
  //         if (err) reject('Key not found');
  //         resolve(data);
  //       });
  //   });
  // };

  async addToCart(prod: any): Promise<any> {
    const cartkey = await this.getLocalKey();
    let newcartdetkey: any;
    // Check if product input by user is already present in his cart database
    this.checkProdInCartDb(cartkey, prod.productId).then((prodFound) => {
      console.log('prodpresent =', prodFound);

      if (!prodFound) {
        // add new record to db
        this.getCartDetId(cartkey, prod.productId).then(async (newkey) => {
          newcartdetkey = newkey;
          const docRef = setDoc(doc(this.fs, 'cartdetails', newcartdetkey), {
            cartKey: cartkey,
            productId: prod.productId,
            productImageURL: prod.productImageURL,
            productName: prod.productName,
            price: prod.price,
            qty: 1,
            lastupdate: serverTimestamp(),
          });
        });
      } else {
        // if reco exist update qty

        this.getCartDetId(cartkey, prod.productId).then(async (newkey) => {
          newcartdetkey = newkey;
          const docRef = doc(this.fs, 'cartdetails', newcartdetkey);

          // Set the "qty" and 'lastupdate' fields
          await updateDoc(docRef, {
            qty: this.addqty + 1,
            lastupdate: serverTimestamp(),
          });
        });
      }
    });
    return true;
  }

  async checkProdInCartDb(cartkey: any, prodid: string): Promise<any> {
    const snapshot = this.queryByCartkeyByProdid(cartkey, prodid);
    // Initial value is false
    this.productpresent = false;

    (await snapshot).forEach((doc: any) => {
      console.log(doc.id);
      console.log(doc.data());

      if (doc.data()['qty'] >= 1) {
        this.productpresent = true;
        this.docid = doc.id;
        this.addqty = doc.data()['qty'];
      } else {
        this.productpresent = false;
      }
    });
    return this.productpresent;
  }

  async getCartDetId(cartkey: any, prodid: string): Promise<any> {
    return `${prodid.trim()}-${cartkey.trim()}`;
  }

  async raiseQty(docid: any): Promise<any> {}

  // checkProdInCartDb = (cartId: string, prodid: string) => {
  //   return new Promise((reject: any, resolve: any) => {
  //     const q = query(
  //       this.cartDetCollRef,
  //       where('productId', '==', prodid),
  //       where('cartKey', '==', cartId)
  //     );

  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, ' => ', doc.data()['qty']);
  //       if (doc.data()['qty'] >= 1) {
  //         this.productpresent = true;
  //         this.docid = doc.id;
  //         this.addqty = doc.data()['qty'];
  //       } else {
  //         this.productpresent = false;
  //         return reject(this.productpresent);
  //       }
  //       return resolve(this.productpresent);
  //     });
  //   });
  // };
}
