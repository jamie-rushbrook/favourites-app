import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the FavoriteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FavoriteService {
  existingEntries: any;
  constructor(public storage: Storage) {
    console.log('Hello FavoriteService Provider');
  }

  get(){
    return new Promise (resolve => {
       this.storage.get('allFavorites').then((val) =>
      {
        if(!val){
          resolve(null);
        } else {
          resolve(val);
        }
      });
    })


  }

  add(item){
    return new Promise (resolve => {
      this.storage.get('allFavorites').then((val) => {
        // if(!val){
        //   this.storage.set('allFavorites', [
        //   ]).then(
        //     () => {
        //     this.existingEntries = [];
        //     console.log('original favorites', this.existingEntries);
        //     this.existingEntries.push(item);
        //     this.storage.set('allFavorites', this.existingEntries).then(
        //       () => {
        //       this.storage.get('allFavorites').then(
        //         (name) => {
        //           console.log("all favorites in storage", name);
        //           console.log("new favorites", this.existingEntries);
        //           resolve();
        //         });
        //       }
        //     );
        //   });
        // }
        // else {
          console.log('val', val);
          this.existingEntries = val;
          console.log('original favorites', this.existingEntries);
          this.existingEntries.push(item);
          this.storage.set('allFavorites', this.existingEntries).then(
            () => {
              this.storage.get('allFavorites').then((name) => {
                console.log("all favorites in storage", name);
                console.log("new favorites", this.existingEntries);
                resolve();
              });
            }
          );
        // }
      });
    });
  }

  clear(){
    this.storage.clear().then(() => {
      this.storage.set('allFavorites', []);
    }
  )
  }

  remove(_item){
    return new Promise(resolve => {
      this.storage.get('allFavorites').then(
        (val) => {
          val.splice(_item, 1);
          console.log(val);
          this.storage.set('allFavorites', val).then(
            () => {
              console.log('set');
              resolve(val);
            });
        });
    })
  }
}
