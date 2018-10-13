class Offer {
  constructor({avatar, title, x, y, price, type, rooms, guests, checkin, checkout, features, description, photos, date}) {
    this.avatar = avatar;
    this.title = title;
    this.address = `${x} ${y}`;
    this.price = price;
    this.type = type;
    this.rooms = rooms;
    this.guests = guests;
    this.checkin = checkin;
    this.checkout = checkout;
    this.features = features;
    this.description = description;
    this.photos = photos;
    this.x = x;
    this.y = y;
    this.date = date;
  }

  get entity() {
    return {
      author: {
        avatar: this.avatar
      },
      offer: {
        title: this.title,
        address: this.address,
        price: this.price,
        type: this.type,
        rooms: this.rooms,
        guests: this.guests,
        checkin: this.checkin,
        checkout: this.checkout,
        features: this.features,
        description: this.description,
        photos: this.photos
      },
      location: {
        x: this.x,
        y: this.y
      },
      date: this.date
    };
  }
}

module.exports = Offer;
