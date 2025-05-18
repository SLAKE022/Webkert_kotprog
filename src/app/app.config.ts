import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "bio-bolt", appId: "1:928900475967:web:fc6dd15e56557b2a87dc8a", storageBucket: "bio-bolt.firebasestorage.app", apiKey: "AIzaSyCR2pYFRNAFXXAyFCHheFTPGAEqckP61-k", authDomain: "bio-bolt.firebaseapp.com", messagingSenderId: "928900475967", measurementId: "G-9F4DGJBZ8F" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
