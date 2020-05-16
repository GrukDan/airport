export class Rating {
  idRating:number;
  rating:number;
  expert:number;
  alternative:number;
  timeOfCreation:number;

   buildRating(alternative:number,rating:number,expert:number):Rating{
     this.alternative = alternative;
     this.rating = rating;
     this.expert = expert;
     return this;
   }
}
