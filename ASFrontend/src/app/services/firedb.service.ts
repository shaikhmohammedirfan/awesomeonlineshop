import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
import { Storage } from '@capacitor/storage';
import { setDoc, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';

// Define a key in local capacitory storage to store user cart id
const CART_STORAGE_KEY = 'MY_CART';

@Injectable({
  providedIn: 'any',
})
export class FiredbService {
  // ********** Collection references *********//
  brandCollRef = collection(this.fs, 'brands');
  categoryCollRef = collection(this.fs, 'categories');
  productRef = collection(this.fs, 'products');
  cartDetCollRef = collection(this.fs, 'cartdetails');
  usermasterCollRef = collection(this.fs, 'usermaster');
  useremailmasterCollRef = collection(this.fs, 'useremailmaster');
  usermobilemasterCollRef = collection(this.fs, 'usermobilemaster');

  constructor(private fs: Firestore) {}

  // ************ USERMASTER COLLECTION ************ //
  // Get cartkey stored in usermaster table
  async getCartKeyFromUserMaster(email: any): Promise<any> {
    // console.log(email);
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

  async getLocalKey(): Promise<any> {
    let ukey = (await Storage.get({ key: CART_STORAGE_KEY })).value;
    return ukey;
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
  async addToUserEmail(userdata: any): Promise<any> {
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
  async addToUserMobile(userdata: any): Promise<any> {
    const docData = {
      uid: userdata.user.uid,
      userorigmobile: userdata.user.phoneNumber,
      usercurrmobile: userdata.user.phoneNumber,
      lastmodified: serverTimestamp(),
      modifiedby: userdata.user.uid,
    };
    await setDoc(doc(this.fs, 'usermobile', userdata.user.uid), docData);
  }

  // ************ CATEGORY COLLECTION ************ //

  loadAllCategories(): Observable<any> {
    return collectionData(this.categoryCollRef);
  }
  // Add new category to categories collection
  async addNewCategory(categoryFormVal: any): Promise<any> {
    console.log('CATEGORYCODE IN SERVICE=', categoryFormVal.imageURL);
    categoryFormVal.modifiedby = await Storage.get({ key: CART_STORAGE_KEY });

    const docData = {
      categoryCode: categoryFormVal.categorycode,
      categoryName: categoryFormVal.categoryname,
      imageURL: categoryFormVal.imageurl,
      modifiedBy: categoryFormVal.modifiedby.value,
      modifiedDate: serverTimestamp(),
    };
    await setDoc(
      doc(this.fs, 'categories', categoryFormVal.categorycode),
      docData
    );
    console.log('Document written with ID: ', docData);
    return docData;
  }
}
