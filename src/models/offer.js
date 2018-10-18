class Offer {
  constructor(props) {
    this.props = Object.assign(props, {address: `${props.x} ${props.y}`});
  }

  get entity() {
    const {avatar, date, x, y, ...offer} = this.props;
    return {
      author: {avatar},
      offer,
      location: {x, y},
      date
    };
  }
}

module.exports = Offer;
