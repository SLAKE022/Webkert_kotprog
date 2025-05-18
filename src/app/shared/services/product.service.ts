  import { Injectable } from '@angular/core';
  import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, orderBy } from '@angular/fire/firestore';
  import { Observable, from, map } from 'rxjs';
import {where, limit, startAfter } from '@angular/fire/firestore';

import { collectionData } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';

  export interface Product {
    id: string;
    name: string;
    category: string;
    stock: boolean;
    expire: string;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private readonly PRODUCTS_COLLECTION = 'Products';

    constructor(private firestore: Firestore) {}

    private formatDateToString(date: Date | string): string {
      if (typeof date === 'string') {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
          return new Date().toISOString().split('T')[0];
        }
        return date.includes('T') ? date.split('T')[0] : date;
      }
      return date.toISOString().split('T')[0];
    }

    // CREATE
    async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
      const productToSave = {
        ...product,
        expire: this.formatDateToString(product.expire)
      };

      const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
      const docRef = await addDoc(productsCollection, productToSave);
      const productId = docRef.id;
      await updateDoc(docRef, { id: productId });

      return {
        ...productToSave,
        id: productId
      };
    }

    // READ - Get all products
    getAllProducts(): Observable<Product[]> {
      const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
      const q = query(productsCollection, orderBy('expire', 'desc'));

      return from(getDocs(q)).pipe(
        map(querySnapshot =>
          querySnapshot.docs.map(doc => doc.data() as Product)
        )
      );
    }
    getAllProductsInStock(): Observable<Product[]> {
      const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
      const q = query(productsCollection,where('stock', '==', true));

      return from(getDocs(q)).pipe(
        map(querySnapshot => 
          querySnapshot.docs.map(doc => doc.data() as Product)
        )
      );
    }
    getExpireSoon(): Observable<Product[]> {
      const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
      const q = query(productsCollection, orderBy('expire', 'desc'), limit(1));

      return from(getDocs(q)).pipe(
        map(querySnapshot =>
          querySnapshot.docs.map(doc => doc.data() as Product)
        )
      );
    }
    getExpiredOutOfStock(): Observable<Product[]> {
      const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
      
      const today = new Date().toISOString().split('T')[0];
      const q = query(productsCollection,where('expire', '<', today));

      return from(getDocs(q)).pipe(
        map(querySnapshot =>
          querySnapshot.docs.map(doc => doc.data() as Product)
        )
      );
    }
    // READ - Get product by ID
    async getProductById(productId: string): Promise<Product | null> {
      const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);
      const productSnapshot = await getDoc(productDocRef);
      if (productSnapshot.exists()) {
        return productSnapshot.data() as Product;
      }
      return null;
    }
    // DELETE
    async deleteProduct(productId: string): Promise<void> {
      const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);
      await deleteDoc(productDocRef);
    }

    //lekérdezés komplex
    searchProducts(term: string): Observable<Product[]> {
      const lowerTerm = term.toLowerCase();
      return this.getAllProducts().pipe(
        map(products =>
          products.filter(product =>
            product.name.toLowerCase().includes(lowerTerm) ||
            product.category.toLowerCase().includes(lowerTerm)
          )
        )
      );
    }
    

}
